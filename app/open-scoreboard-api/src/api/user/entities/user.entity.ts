import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserCredential } from './user_credentials.entity';
import { UserPhoto } from './user_photo.entity';
import { UserSettings } from './user_settings.entity';
import { Role } from '../../../auth/rbac/role.enum';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: true })
  lastName: string;

  @Column({ nullable: false, unique: true })
  email: string;

  @OneToOne(
    () => UserCredential,
    (userCredentials: UserCredential) => userCredentials.user,
    { cascade: true },
  )
  @JoinColumn()
  credentials: UserCredential;

  @Column({
    type: 'enum',
    enum: Role,
    default: [Role.User],
    array: true,
  })
  roles: Role[];

  @OneToOne(() => UserPhoto, (userPhoto: UserPhoto) => userPhoto.user, {
    cascade: true,
  })
  photo: UserPhoto;

  @OneToOne(
    () => UserSettings,
    (userSettings: UserSettings) => userSettings.user,
    { cascade: true },
  )
  @JoinColumn()
  settings: UserSettings;
}
