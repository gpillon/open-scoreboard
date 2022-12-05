import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class UserCredential {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  password: string;

  @Column({ nullable: false, default: 'local' })
  provider: string;

  @Column({ nullable: true })
  salt: string;

  // @Column()
  // token?: string;
  //
  // @Column()
  // refreshToken?: string;

  @OneToOne(() => User, (user: User) => user.credentials, { nullable: false })
  user: User;
}
