import { Column, Entity, JoinTable, ManyToMany,PrimaryGeneratedColumn } from "typeorm"
import { Coupon } from "./Coupon"

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ unique: true})
    email: string

    @Column()
    senha: string

    @ManyToMany(() => Coupon, coupon => coupon.users)
    @JoinTable({
        name: 'coupon_user',
        joinColumn: {
            name: 'coupon_id',
            referencedColumnName: 'id'
        },
        inverseJoinColumn: {
            name: 'user_id',
            referencedColumnName: 'id'
        }
    })
    coupons: Coupon[]
}