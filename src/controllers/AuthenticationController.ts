import { Request, Response } from "express";
import { userRepository } from "../repositories/UserRepository";
import jwt from 'jsonwebtoken';
import { BadRequestError } from "../helpers/apiError";

export class AuthenticationController {
    async login(req: Request, res: Response) {
        const { email, senha } = req.body;

        if (!email && !senha) {
            throw new BadRequestError('Precisa passar o email e a senha');
        }

        const user = await userRepository.findOneBy({ email: email });

        if (!user) {
            return res.status(500).json({ msg: 'Email ou senha invalidos' });
        }

        if (user.senha !== senha) { 
            throw new BadRequestError('Email ou senha invalidos');
        }

        const { senha: _, ...userLogin } = user;

        const token = jwt.sign({ userLogin }, 'projetoIntegrador', { expiresIn: '1d' });

        return res.json({token: token})
    }
}