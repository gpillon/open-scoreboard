import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  NotFoundException,
  Param,
  Patch,
  Post,
  Res,
  UnauthorizedException,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { ReadUserDto } from './dto/read-user.dto';
import { IdUserParamDto } from './dto/id-user-param.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { UserPhoto } from './entities/user_photo.entity';
import { FileUploadDto } from './dto/file-upload.dto';
import { ReadUserSettingsDto } from './dto/read-user-settings.dto';
import { UpdateUserSettingsDto } from './dto/update-user-settings.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { Role } from '../../auth/rbac/role.enum';
import { JwtAuthRoles } from '../../auth/guards/jwt-auth-role-guard.service';
import { GetUser } from '../../auth/decorators/get-user.decorator';
import { GetRoles } from '../../auth/decorators/get-roles.decorator';

@ApiTags('User')
@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @JwtAuthRoles([Role.Admin])
  create(@Body() createUserDto: CreateUserDto): void {
    // return this.userService.create(createUserDto);
  }

  @Get()
  @JwtAuthRoles([Role.Admin])
  findAll(): Promise<ReadUserDto[]> {
    return this.userService.findAll();
  }

  @Get(':id')
  @JwtAuthRoles([Role.User])
  @ApiResponse({
    status: HttpStatus.OK,
    type: ReadUserDto,
  })
  findOne(
    @Param() { id }: IdUserParamDto,
    @GetUser() user: User,
    @GetRoles() roles: Role[],
  ): Promise<ReadUserDto> {
    if (['me', 'current'].includes(id)) {
      id = user.id;
    } else if (!roles.includes(Role.Admin) && id !== user.id) {
      throw new UnauthorizedException('User is not authorized');
    }
    return this.userService.findById(id);
  }

  @Patch(':id')
  @JwtAuthRoles([Role.User])
  update(
    @Param() { id }: IdUserParamDto,
    @Body() updateUserDto: UpdateUserDto,
    @GetRoles() roles: Role[],
    @GetUser() user: User,
  ): ReadUserDto {
    if (['me', 'current'].includes(id)) {
      id = user.id;
    } else if (!roles.includes(Role.Admin) && id !== user.id) {
      throw new UnauthorizedException('User is not authorized');
    }
    const editedUser = this.userService.update(id, updateUserDto);
    return plainToInstance(ReadUserDto, editedUser);
  }

  @Delete(':id')
  @JwtAuthRoles([Role.Admin])
  remove(@Param() { id }: IdUserParamDto): Promise<void> {
    return this.userService.remove(id);
  }

  @Get(':id/photo')
  @JwtAuthRoles([Role.User])
  async getPhoto(
    @Param() { id }: IdUserParamDto,
    @GetUser() user: User,
    @GetRoles() roles: Role[],
    @Res() res,
  ): Promise<UserPhoto> {
    if (['me', 'current'].includes(id)) {
      id = user.id;
    } else if (!roles.includes(Role.Admin) && id !== user.id) {
      throw new UnauthorizedException('User is not authorized');
    }
    const userPhoto = await this.userService.getPhoto(id);
    if (!userPhoto) {
      throw new NotFoundException('profile photo not found!');
    } else {
      res.header('Content-Type', userPhoto.mimeType);
      res.header(
        'Content-Disposition',
        `attachment; filename=${userPhoto.name}`,
      );
      res.header('Content-Length', userPhoto.size);
      res.write(userPhoto.data);
      return res.end();
    }
  }

  @Post(':id/photo')
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Profile Picture',
    type: FileUploadDto,
  })
  @ApiOperation({ summary: 'Upload Photo' })
  // @ApiImplicitFile({name: 'file', required: true})
  @JwtAuthRoles([Role.User])
  async uploadPhoto(
    @UploadedFile() file: any, // Express.Multer.File,
    @Param() { id }: IdUserParamDto,
    @GetUser() user: User,
    @GetRoles() roles: Role[],
  ): Promise<{ result: 'ok' }> {
    if (['me', 'current'].includes(id)) {
      id = user.id;
    } else if (!roles.includes(Role.Admin) && id !== user.id) {
      throw new UnauthorizedException('User is not authorized');
    }
    const photoResult = await this.userService.savePhoto(file, id);
    if (!photoResult) {
      throw new BadRequestException('invalid Request');
    }
    return photoResult;
  }

  @Get(':id/settings')
  @JwtAuthRoles([Role.User])
  async getSettings(
    @Param() { id }: IdUserParamDto,
    @GetUser() user: User,
    @GetRoles() roles: Role[],
  ): Promise<ReadUserSettingsDto> {
    if (['me', 'current'].includes(id)) {
      id = user.id;
    } else if (!roles.includes(Role.Admin) && id !== user.id) {
      throw new UnauthorizedException('User is not authorized');
    }
    const userSettings = await this.userService.getSettings(id);
    if (!userSettings) {
      throw new NotFoundException('User settings not found!');
    }
    return userSettings;
  }

  @Patch(':id/settings')
  @ApiOperation({ summary: 'Edit Settings' })
  @JwtAuthRoles([Role.User])
  async updateSettings(
    @Param() { id }: IdUserParamDto,
    @GetUser() user: User,
    @Body() updates: UpdateUserSettingsDto,
    @GetRoles() roles: Role[],
  ): Promise<ReadUserSettingsDto> {
    if (['me', 'current'].includes(id)) {
      id = user.id;
    } else if (!roles.includes(Role.Admin) && id !== user.id) {
      throw new UnauthorizedException('User is not authorized');
    }
    const settingsResult = await this.userService.updateSettings(id, updates);
    if (!settingsResult) {
      throw new BadRequestException('Invalid Request');
    }
    return settingsResult;
  }

  @Patch(':id/change-password')
  @ApiOperation({ summary: 'Edit password' })
  @JwtAuthRoles([Role.User])
  async updatePassword(
    @Param() { id }: IdUserParamDto,
    @GetUser() user: User,
    @Body() updates: UpdatePasswordDto,
    @GetRoles() roles: Role[],
  ): Promise<{ result: 'ok' }> {
    if (['me', 'current'].includes(id)) {
      id = user.id;
    } else if (!roles.includes(Role.Admin) && id !== user.id) {
      throw new UnauthorizedException('User is not authorized');
    }
    const updatedUserPassword = await this.userService.updatePassword(
      id,
      updates,
    );
    if (!updatedUserPassword) {
      throw new BadRequestException('Invalid Request');
    }

    return { result: 'ok' };
  }
}
