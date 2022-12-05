import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';

import { User } from './user.entity';

@Entity()
export class UserSettings {
  @Column({ nullable: true })
  themeName: string;

  // @PrimaryColumn('uuid', { name: 'userId', nullable: false, unique: true })

  @PrimaryColumn()
  userId: string;

  @OneToOne(() => User, (user: User) => user.settings)
  @JoinColumn()
  user: User;

  // @RelationId((user: User) => user.id)
  // @Exclude()
  // userId: string;
}
