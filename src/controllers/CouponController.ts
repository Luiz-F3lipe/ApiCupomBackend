import { Request, Response } from "express";
import { couponRepository } from "../repositories/CouponRepository";
import { storeRepository } from "../repositories/StoreRepository";

export class CouponController {

    async create(req: Request, res: Response) {
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

    async delete(req: Request, res: Response) {
        const { idCoupon } = req.params;

        if (!idCoupon) {
            return res.status(400).json({ msg: 'Falha ao deletar verifique se enviou os parametros' })
        }

        try {
            const selectCoupon = await couponRepository.findOneBy({ id: Number(idCoupon) })

            if (!selectCoupon) {
                return res.status(404).json({ msg: 'Cupom não encontrado!' })
            }

            await couponRepository.remove(selectCoupon);

            return res.status(204).json({ msg: "Cupom Deletado" });
        } catch (error) {
            console.log(error)
            return res.status(500).json({ msg: 'Internal Server Error' })
        }
    }

    async list(req: Request, res: Response) {
        try {
            const cupons = await couponRepository.find({
                relations: {
                    store: true,
                },
            })

            return res.json(cupons)
        } catch (error) {
            console.log(error)
            return res.status(500).json({ msg: "Internal Server Error" })
        }
    }
}