import { AppDataSource } from "../data-souce";
import { Store } from "../entities/Store";

export const storeRepository = AppDataSource.getRepository(Store)