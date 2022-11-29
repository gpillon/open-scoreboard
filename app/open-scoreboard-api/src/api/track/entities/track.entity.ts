import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Lap} from "../../lap/entities/lap.entity";
import {Game} from "../../game/entities/game.entity";

@Entity()
export class Track {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({unique: true})
    name: string

    @Column({type: "text"})
    description: string

    @OneToMany( () => Lap, lap => lap.track)
    laps: Lap[]

    @OneToMany(() => Game, game => game.track)
    games: Game[]
}
