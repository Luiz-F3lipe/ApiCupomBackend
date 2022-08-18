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

    async delete(req: Request, res: Response) {
        const { idStore } = req.params;

        if (!idStore) {
            return res.status(400).json({ msg: 'Falha ao deletar verifique se enviou os parametros' })
        }

        try {
            const selectStore = await storeRepository.findOneBy({ id: Number(idStore) })

            if (!selectStore) {
                return res.status(404).json({ msg: "Loja não encontrada!" })
            }

            await storeRepository.remove(selectStore);

            return res.status(204).json({ msg: "Loja Deletada" });
        } catch (error) {
            //console.log(error)
            return res.status(500).json({ msg: "Internal Server Error" })
        }
    }

    async list(req: Request, res: Response) {
        try {
            const stores = await storeRepository.find({
                relations: {
                    coupon: true,
                },
            })

            return res.json(stores)
        } catch (error) {
            console.log(error)
            return res.status(500).json({ msg: "Internal Server Error" })
        }
    }
}