import { Request, Response } from "express";
import {
  BadRequestError,
  ConflictError,
  NotFoundError,
} from "../helpers/apiError";
import { couponRepository } from "../repositories/CouponRepository";
import { storeRepository } from "../repositories/StoreRepository";

//Controlador da store
export class StoreContoller {
  //Função de cria Loja
  async create(req: Request, res: Response) {
    const { name, image, link } = req.body;

    if (!name || !image || !link) {
      throw new BadRequestError(
        "Falha no body verifique se enviou todas as informações"
      );
    }
    const selectStore = await storeRepository.findOneBy({
      name: name,
    });

    if (selectStore) {
      throw new ConflictError("Loja já cadastrada");
    }

    //Cria um repositorio de store
    const newStore = storeRepository.create({
      name,
      image,
      link,
    });

    //Salva no banco de dados
    await storeRepository.save(newStore);

    return res.status(201).json(newStore);
  }

  async delete(req: Request, res: Response) {
    const { idStore } = req.params;

    if (!idStore) {
      throw new BadRequestError("Precisa passar o id da loja");
    }

    const selectStore = await storeRepository.findOneBy({
      id: Number(idStore),
    });

    if (!selectStore) {
      throw new NotFoundError("Loja não encontrada");
    }

    await storeRepository.remove(selectStore);

    return res.status(204).json({ msg: "Loja Deletada" });
  }

  async list(req: Request, res: Response) {
    try {
      const stores = await storeRepository.find({
        relations: {
          coupon: true,
        },
      });

      return res.json(stores);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ msg: "Internal Server Error" });
    }
  }

  async listOne(req: Request, res: Response) {
    const { idStore } = req.params;

    if (!idStore) { 
        throw new BadRequestError("Precisa passar o id da loja");
    }

    const store = await storeRepository.findOne({
        where: {
          id: Number(idStore),
        },
        relations: {
          coupon: true,
        }
    });

    if (!store) {
        throw new NotFoundError("Loja não encontrada");
    }

    return res.json(store);
  }
}
