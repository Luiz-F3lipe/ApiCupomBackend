import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { Store } from "./Store"

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

    @ManyToOne(() => Store, store => store.coupon)
    @JoinColumn({name: 'store_id'})
    store: Store
}