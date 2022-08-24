import { Request, Response } from "express";
import { couponRepository } from "../repositories/CouponRepository";
import { userRepository } from "../repositories/UserRepository";
import { BadRequestError, ConflictError, NotFoundError } from "../helpers/apiError";
import { request } from "http";

export class UserController {
  async create(req: Request, res: Response) {
    const { email, senha, name } = req.body;

    if (!email && !senha && !name) {
      throw new BadRequestError("Precisa passar email senha e nome no body");
    }

    const userExists = await userRepository.findOneBy({ email: email });

    if (!email || !senha) {
      throw new BadRequestError("Email ou senha invalidos!");
    }

    if (userExists) {
      throw new ConflictError("Email ja cadastrado");
    }

    const newUser = userRepository.create({
      email,
      senha,
      name,
    });

    const { senha: _,...userSend } = newUser;

    await userRepository.save(newUser);

    return res.status(201).json(userSend);
  }

  async couponUser(req: Request, res: Response) {
    //const { coupon_id } = req.body;
    const { idUser, coupon_id } = req.params;

    if (!idUser && !coupon_id) {
      throw new BadRequestError(
        "Precisa passar o id do Usuario e o Id do cupon"
      );
    }

    const user = await userRepository.findOneBy({ id: Number(idUser) });

    if (!user) {
      throw new NotFoundError('Usuario não encontrado');
    }

    const coupon = await couponRepository.findOneBy({
      id: Number(coupon_id),
    });

    if (!coupon) {
      throw new NotFoundError('Cupom não encontrado');
    }

    const userUpdate = {
      ...user,
      coupons: [coupon],
    };

    await userRepository.save(userUpdate);

    return res.status(201).json(userUpdate);

  }

  async list(req: Request, res: Response) {

      const users = await userRepository.find({
        relations: {
          coupons: true,
        },
      });

      return res.json(users);
  }

  async listById(req: Request, res: Response) {
    const { idUser } = req.params;

    if (!idUser) {
      throw new BadRequestError('Precisa passar o id do usuario');
    }

    const user = await userRepository.findOne({
      where: {
        id: Number(idUser),
      },
      relations: {
        coupons: true,
        
      }
    });

    if (!user) { 
      throw new NotFoundError('Usuario não encontrado');
    }    

    return res.json(user);
  }
}

