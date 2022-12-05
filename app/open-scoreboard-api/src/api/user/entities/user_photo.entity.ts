import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { User } from './user.entity';

@Entity()
export class UserPhoto {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column('int')
  size: number;

  @Column({ type: 'bytea' })
  data: Buffer;

  @Column()
  mimeType: string;

  @OneToOne(() => User, (user: User) => user.photo)
  @JoinColumn()
  user: User;
}
