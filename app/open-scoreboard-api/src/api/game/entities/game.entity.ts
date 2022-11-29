import {BaseEntity, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {PlayerScore} from "./player-score.entity";
import {Track} from "../../track/entities/track.entity";

@Entity()
export class Game extends BaseEntity {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @OneToMany(() => PlayerScore, playerScore => playerScore.game, {cascade: true})
    playerScore: PlayerScore[]

    @ManyToOne(() => Track, track => track.games)
    track: Track

    @CreateDateColumn()
    createdAt: Date;

}
