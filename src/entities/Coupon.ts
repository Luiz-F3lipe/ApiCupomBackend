import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { Store } from "./Store"
import { User } from "./User"

@Entity('coupons')
export class Coupon {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    description: string

    @Column()
    code: string

    @Column()
    discount: number

    @ManyToOne(() => Store, store => store.coupon, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'store_id' })
    store: Store

    @ManyToMany(() => User, user => user.coupons)
    users: User[]
}