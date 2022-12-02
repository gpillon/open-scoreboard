import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PlayerScore } from '../../game/entities/player-score.entity';

@Entity()
export class Player extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  nickname: string;

  @OneToMany(
    () => PlayerScore,
    (playerScore: PlayerScore) => playerScore.player,
  )
  games: PlayerScore[];

  totalGames: number | null;
}
