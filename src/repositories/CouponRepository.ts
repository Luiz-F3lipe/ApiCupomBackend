import { AppDataSource } from "../data-souce";
import { Coupon } from "../entities/Coupon";

export const couponRepository = AppDataSource.getRepository(Coupon);