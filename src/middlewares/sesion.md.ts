import { NextFunction, Request, Response } from "express";
import { verifyToken } from "../utils/jwt.handle";

/**
 * Middleware para validar la sesión del usuario.
 * Extrae el token del header, lo verifica y asigna el idUsuario a req.body.
 */
export const ValidateSession = (req: Request, res: Response, next: NextFunction) => {
  try {
    const jwtBearer = req.headers.authorization || "";
    // Se espera el formato "Bearer <token>"
    const jwt = jwtBearer.split(" ").pop();
    const isUser = verifyToken(`${jwt}`) as { id: number; email: string; nombres: string };
    if (!isUser) {
      res.status(401).send({ statusCode: 401, msg: "Token no válido" });
      return;
    }
    // Se asigna el idUsuario para usarlo en los controladores
    req.body.idUsuario = isUser.id;
    next();
  } catch (error) {
    res.status(401).send({ statusCode: 401, msg: "Error en la validación de la sesión" });
  }
};
