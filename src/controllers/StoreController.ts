import { Request, Response } from "express";
import { couponRepository } from "../repositories/CouponRepository";
import { storeRepository } from "../repositories/StoreRepository";

//Controlador da store
export class StoreContoller {
    //Função de cria disciplina
    async create(req: Request, res: Response) {
        const { name, image, link } = req.body

        if (!name || !image || !link) {
            return res.status(400).json({ msg: 'Falha no body verifique se enviou todas as informações' })
        }

        try {
            //Cria um repositorio de store
            const newStore = storeRepository.create({
                name,
                image,
                link
            })

            //Salva no banco de dados
            await storeRepository.save(newStore)

            return res.status(201).json(newStore)

        } catch (error) {
            console.log(error)
            return res.status(500).json({ msg: "Internal Server Error" })
        }
    }

    async createCoupon(req: Request, res: Response) {
        const { description, code, discount } = req.body
        const { idStore } = req.params

        if (!description || !code || !discount) {
            return res.status(400).json({ msg: 'Falha no body verifique se enviou todas as informações' })
        }

        try {
            const store = await storeRepository.findOneBy({ id: Number(idStore) })

            if (!store) {
                return res.status(404).json({ msg: "Loja não encontrada!" })
            }

            const newCoupon = couponRepository.create({
                description,
                code,
                discount,
                store
            })

            await couponRepository.save(newCoupon)

            return res.status(201).json(newCoupon)
        } catch (error) {
            console.log(error)
            return res.status(500).json({ msg: "Internal Server Error" })
        }
    }
}