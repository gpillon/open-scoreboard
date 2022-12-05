import {forwardRef, Module} from '@nestjs/common';
import {UserService} from './user.service';
import {UserController} from './user.controller';
import {TypeOrmModule} from '@nestjs/typeorm';
import {User} from './entities/user.entity';
import {UserCredential} from './entities/user_credentials.entity';
import {AuthModule} from '../../auth/auth.module';
import {UserPhoto} from './entities/user_photo.entity';
import {UserSettings} from './entities/user_settings.entity';

@Module({
    imports: [
        forwardRef(() => AuthModule),
        TypeOrmModule.forFeature([User, UserCredential, UserPhoto, UserSettings]),
    ],
    controllers: [UserController],
    providers: [UserService],
})
export class UserModule {
}
