import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';

export async function authToken(req: Request, res: Response, next: NextFunction) {
    const authToken = req.headers.authorization as string;

    if (!authToken) {
        return res.status(401).json({ msg: "Token não encontrado!" });
    }

    const parts = authToken.split(' ');

    if (!(parts.length === 2)) {
        return res.status(401).json({ msg: "Token mal informado!" });
    }

    const [schema, token] = parts;

    if (!/^Bearer$/i.test(schema)) {
        return res.status(401).json({ msg: "Token mal informado!" });
    }

    jwt.verify(token, 'projetoIntegrador', (error, decodedToken) => {
        if (error) {
            console.log(error.message);
            return res.status(401).json({ msg: "Token invalido" })
        }

        return next();
    });
}