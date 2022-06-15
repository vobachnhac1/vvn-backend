/* --------------------------------------------------------
* Author Võ Bách Nhạc
* Email vonhac.20394@gmail.com
* Phone 0906.918.738
* Created: 2022-03-30
*------------------------------------------------------- */
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, Unique } from "typeorm";
@Entity()
@Unique(["username"])
export class UserDemoEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column()
    password: string;

    @Column()
    salt: string;
}

// kahi tham số của bảng  