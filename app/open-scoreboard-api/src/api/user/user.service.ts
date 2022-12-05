import { BadRequestException, Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
import { FindManyOptions } from 'typeorm/find-options/FindManyOptions';
import { UserCredential } from './entities/user_credentials.entity';
import { CryptoService } from '../../auth/crypto.service';
import { UserPhoto } from './entities/user_photo.entity';
import { sharp } from 'sharp';
import { UpdateUserSettingsDto } from './dto/update-user-settings.dto';
import { UserSettings } from './entities/user_settings.entity';
import { plainToInstance } from 'class-transformer';
import { SignUpDto } from '../../auth/dto/sign-up.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { Role } from '../../auth/rbac/role.enum';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(UserCredential)
    private userCredentialRepository: Repository<UserCredential>,
    @InjectRepository(UserPhoto)
    private usersPhotoRepository: Repository<UserPhoto>,
    @InjectRepository(UserSettings)
    private usersSettingsRepository: Repository<UserSettings>,
    private readonly cryptoService: CryptoService,
  ) {}

  private static providerError(provider: string) {
    throw new Error(`Can't find provider ${provider}`);
  }

  async savePhoto(
    photo: /*Express.Multer.File*/ any,
    userId: string,
  ): Promise<{ result: 'ok' } | null> {
    const user = await this.usersRepository.findOneBy({ id: userId });

    if (!user) {
      return null;
    }
    let userPhoto = await this.usersPhotoRepository.findOneBy({
      user: { id: user.id },
    });
    if (!userPhoto) {
      userPhoto = this.usersPhotoRepository.create();
    }
    const resizedPhoto = await sharp(photo.buffer).resize(512, 512).toBuffer();
    Object.assign(userPhoto, {
      name: photo.originalname,
      data: resizedPhoto,
      mimeType: photo.mimetype,
      size: resizedPhoto.length,
      user,
    });

    await this.usersPhotoRepository.save(userPhoto);
    return { result: 'ok' };
  }

  async getPhoto(userId: string): Promise<UserPhoto | null> {
    const user = await this.usersRepository.findOneBy({ id: userId });

    if (!user) {
      return null;
    }
    return await this.usersPhotoRepository.findOneBy({ user: { id: user.id } });
  }

  async updateSettings(
    userId: string,
    updateSettings: UpdateUserSettingsDto,
  ): Promise<UserSettings> {
    const user = await this.usersRepository.findOneBy({ id: userId });
    let userSettings: UserSettings =
      await this.usersSettingsRepository.findOneBy({ user: { id: user.id } });
    const updates = plainToInstance(UpdateUserSettingsDto, updateSettings, {
      excludeExtraneousValues: false,
    });

    if (!userSettings) {
      userSettings = this.usersSettingsRepository.create({ ...updates, user });
      return this.usersSettingsRepository.save(userSettings);
    } else {
      await this.usersSettingsRepository.update(userId, updates);
      return await this.usersSettingsRepository.findOneBy({
        user: { id: user.id },
      });
    }
  }

  async updatePassword(
    userId: string,
    updateSettings: UpdatePasswordDto,
  ): Promise<User> {
    const user = await this.usersRepository.findOne({
      where: { id: userId },
      relations: { credentials: true },
    });

    const checkPassword = this.cryptoService.checkPassword(
      user.credentials.password,
      user.credentials.salt,
      updateSettings.password,
    );

    if (!checkPassword) {
      throw new BadRequestException('Wrong password');
    }
    const password = this.cryptoService.hashPassword(
      updateSettings.newPassword,
    );
    await this.userCredentialRepository.update(user.credentials.id, {
      password: password.hash,
      salt: password.salt,
    });
    return await this.usersRepository.findOneBy({ id: user.id });
  }

  async getSettings(userId: string): Promise<UserSettings | null> {
    const user = await this.usersRepository.findOneBy({ id: userId });

    if (!user) {
      return null;
    }
    return this.usersSettingsRepository.findOneBy({ user: { id: user.id } });
  }

  async create(
    singUpData: SignUpDto & { role: Role; salt: string; provider?: string },
  ): Promise<User> {
    const userCredentialsPlain = {
      password: singUpData.password,
      salt: singUpData.salt,
      provider: singUpData.provider,
    };
    const user = this.usersRepository.create({
      name: singUpData.name,
      lastName: singUpData.lastName,
      email: singUpData.email,
      credentials: this.userCredentialRepository.create(userCredentialsPlain),
    });
    return await this.usersRepository.save(user);
  }

  // findOne(q: FilterQuery<UserDocument>,
  // f?: Array<keyof LeanDocument<UserDocument>>,
  // o?: MongooseQueryOptions): Promise<UserDocument | null> {
  //     return this.userModel.findOne(q, f, o).exec();
  // }

  async findAll(options?: FindManyOptions<User>): Promise<User[]> {
    const users = await this.usersRepository.find({
      relations: { credentials: true },
      ...options,
    });
    return users.map((user) => ({
      ...user,
      credentials: !!user.credentials,
    })) as unknown as User[];
  }

  async findByEmail(email: string): Promise<User> {
    return await this.usersRepository.findOne({ where: { email } });
  }

  findById(id: string, options?: FindOneOptions<User>): Promise<User> {
    return this.usersRepository.findOne({ where: { id: id }, ...options });
  }

  public async changePassword(
    id: string,
    salt: string,
    password: string,
  ): Promise<void> {
    const userWithCredentials = await this.usersRepository.findOne({
      where: { id: id },
      relations: { credentials: true },
    });

    if (!userWithCredentials.credentials) {
      const newUserCredentials = this.userCredentialRepository.create({
        provider: 'local',
        salt,
        password,
      });

      await this.userCredentialRepository.save(newUserCredentials);
      userWithCredentials.credentials = newUserCredentials;
      await this.usersRepository.save(userWithCredentials);
    } else {
      switch (userWithCredentials.credentials.provider) {
        case 'local':
          await this.userCredentialRepository.update(
            userWithCredentials.credentials.id,
            { salt, password },
          );
          break;
        default:
          UserService.providerError(userWithCredentials.credentials.provider);
      }
    }
  }

  public async checkAuthentication(
    user: User,
    password: string,
  ): Promise<boolean> {
    const userWithCredentials = await this.usersRepository.findOne({
      where: { id: user.id },
      relations: { credentials: true },
    });
    switch (userWithCredentials.credentials.provider) {
      case 'local':
        return this.cryptoService.checkPassword(
          userWithCredentials.credentials.password,
          userWithCredentials.credentials.salt,
          password,
        );

      default:
        UserService.providerError(userWithCredentials.credentials.provider);
    }
  }

  async update(id: string, updates: Partial<User>): Promise<User | null> {
    await this.usersRepository.update(id, updates);
    return this.findById(id);
  }

  async remove(id: string): Promise<void> {
    try {
      await this.usersRepository.delete(id);
    } catch (e) {
      throw new BadRequestException(e && e.message ? e.message : e);
    }
  }
}
