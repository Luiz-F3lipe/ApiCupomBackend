import { Request, Response } from "express";
import { userRepository } from "../repositories/UserRepository";
import bcryt from 'bcrypt';
import jwt from 'jsonwebtoken';

export class AuthenticationController {
    async login(req: Request, res: Response) {
        const { email, senha } = req.body;

        const user = await userRepository.findOneBy({ email: email })

        if (!user) {
            return res.status(500).json({ msg: 'Email ou senha invalidos' })
        }

        const verifyPassword = await bcryt.compare(senha, user.senha)

        if (!verifyPassword) {
            return res.status(500).json({ msg: 'Email ou senha invalidos' })
        }

        const token = jwt.sign({ id: user.id }, 'projetoIntegrador', { expiresIn: '1d' })

        const { senha: _, ...userLogin } = user

        return res.json({
            user: userLogin,
            token: token,
        })
    }
}