import { Request, Response } from "express";
import { couponRepository } from "../repositories/CouponRepository";
import { userRepository } from "../repositories/UserRepository";

export class UserController {
     async create(req: Request, res: Response) {
        const { email, senha } = req.body;

        if (!email || !senha) {
            return res.status(400).json({ message: 'O Email e senha é obrigatório' })
        }

        try {
            const newUser = await userRepository.create({
                email,
                senha
            })

            await userRepository.save(newUser);

            return res.status(201).json(newUser)
            
        } catch (error) {
            console.log(error)
            return res.status(500).json({ message: 'Internal Server Error' })
        }
    }

    async couponUser(req: Request, res: Response) {
        const { coupon_id } = req.body;
        const { idUser } = req.params;

        try {
            const user = await userRepository.findOneBy({ id: Number(idUser)});

            if (!user) {
                return res.status(404).json({ message: 'Usuario não encontrado' })
            }

            const coupon = await couponRepository.findOneBy({
                id: Number(coupon_id),
            })

            if (!coupon) {
                return res.status(404).json({ message: 'Cupom não encontrado' })
            }

            const userUpdate = {
                ...user,
                coupons: [coupon],
            }

            await userRepository.save(userUpdate)

            return res.status(200).json(userUpdate)
            
        } catch (error) {
            console.log(error)
            return res.status(500).json({ message: 'Internal Server Error' })
        }
    }

    async list(req: Request, res: Response) {
        try {
			const users = await userRepository.find({
				relations: {
					coupons: true,
				},
			})

			return res.json(users)
		} catch (error) {
			console.log(error)
			return res.status(500).json({ message: 'Internal Sever Error' })
		}
    }

}