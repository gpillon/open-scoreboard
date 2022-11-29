import {BaseEntity, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Player} from "../../player/entities/player.entity";
import {JoinTable} from "typeorm";
import {Lap} from "../../lap/entities/lap.entity";
import {Game} from "./game.entity";

@Entity()
export class PlayerScore extends BaseEntity {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @ManyToOne(() => Game, game => game.playerScore)
    game: Game

    @ManyToOne(() => Player, {eager: true, nullable: false})
    player: Player

    @ManyToMany(() => Lap, {eager: true, cascade: true})
    @JoinTable()
    laps: Lap[]

    totalTime: number;
}
