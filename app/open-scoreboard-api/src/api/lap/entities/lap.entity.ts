import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Track } from '../../track/entities/track.entity';
import { Player } from '../../player/entities/player.entity';

@Entity()
export class Lap {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Track, (track) => track.laps, { nullable: false })
  track: Track;

  @ManyToOne(() => Player, { nullable: false })
  player: Player;

  @Column({ nullable: false })
  lapNum: number;

  @Column('float', { nullable: false })
  lapTime: number;
}
