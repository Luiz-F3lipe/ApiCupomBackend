import { AppDataSource } from "../data-souce";
import { User } from "../entities/User";

export const userRepository = AppDataSource.getRepository(User);