import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Player {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({unique: true})
    nickname: string
}
