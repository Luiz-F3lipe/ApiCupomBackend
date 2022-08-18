import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { Coupon } from "./Coupon"

@Entity('stores')
export class Store {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    image: string

    @Column()
    link: string

    @OneToMany(() => Coupon, coupon => coupon.store, { onDelete: 'CASCADE' })
    coupon: Coupon[]

}