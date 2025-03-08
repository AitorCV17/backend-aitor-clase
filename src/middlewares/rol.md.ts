import { NextFunction, Request, Response } from "express";
import { verifyToken } from "../utils/jwt.handle";
import { getUsuario } from "../services/usuario.srv";
import { RolUsuario } from "@prisma/client";

/**
 * Middleware para requerir un rol específico.
 * Verifica el token enviado en la cabecera, obtiene el usuario de la BD y
 * permite continuar solo si el usuario tiene el rol requerido.
 */
export const rolRequired = (role: RolUsuario) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const jwtBearer = req.headers.authorization || "";
            const jwt = jwtBearer.split(" ").pop();
            // Verifica el token y extrae la carga útil
            const isUser = verifyToken(`${jwt}`) as { id: number, email: string, nombres: string };
            // Obtiene el usuario desde la base de datos
            const { rol } = await getUsuario(isUser.id);
            if (rol === role) {
                next();
            } else {
                res.status(401).send({ codigo: 401, msg: "No autorizado" });
            }
        } catch (error) {
            res.status(401).send({ codigo: 401, msg: "Sesión no válida" });
        }
    }
};
