import { Column, Entity, JoinTable, ManyToMany, PrimaryColumn } from "typeorm"
import { Coupon } from "./Coupon"

@Entity('users')
export class User {
    @PrimaryColumn()
    email: string

    @Column()
    senha: string

    @ManyToMany(() => Coupon, coupon => coupon.user)
    @JoinTable()
    coupons: Coupon[]
}