import { Request, Response } from "express";
import { BadRequestError, NotFoundError } from "../helpers/apiError";
import { couponRepository } from "../repositories/CouponRepository";
import { storeRepository } from "../repositories/StoreRepository";

export class CouponController {
  async create(req: Request, res: Response) {
    const { description, code, discount } = req.body;
    const { idStore } = req.params;

    if (!description || !code || !discount) {
      throw new BadRequestError(
        "Falha no body verifique se enviou todas as informações"
      );
    }

    if (!idStore) {
      throw new BadRequestError(
        "Informe o id da loja que sera cadastrado o cupom"
      );
    }

    const store = await storeRepository.findOneBy({ id: Number(idStore) });

    if (!store) {
      throw new NotFoundError("Loja não encontrada");
    }

    const newCoupon = couponRepository.create({
      description,
      code,
      discount,
      store,
    });

    await couponRepository.save(newCoupon);

    return res.status(201).json(newCoupon);
  }

  async delete(req: Request, res: Response) {
    const { idCoupon } = req.params;

    if (!idCoupon) {
      throw new BadRequestError(
        "Falha ao deletar verifique se enviou os parametros"
      );
    }

    const selectCoupon = await couponRepository.findOneBy({
      id: Number(idCoupon),
    });

    if (!selectCoupon) {
      throw new NotFoundError("Cupom não encontrado!");
    }

    await couponRepository.remove(selectCoupon);

    return res.status(204).json({ msg: "Cupom Deletado" });
  }

  async list(req: Request, res: Response) {
    try {
      const cupons = await couponRepository.find({
        relations: {
          store: true,
        },
      });

      return res.json(cupons);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ msg: "Internal Server Error" });
    }
  }

  async listOne(req: Request, res: Response) {
    const { idCoupon } = req.params;

    if (!idCoupon) {
        throw new BadRequestError('Precisa do id do cupom')
    }

    const coupon = await couponRepository.findOne({
        where: {
          id: Number(idCoupon),
        },
        relations: {
          store: true,
          
        }
    });

    if (!coupon) {
        throw new NotFoundError("Cupom não encontrado!");
    }

    return res.json(coupon);
  }
}
