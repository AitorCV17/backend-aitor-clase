import { Request, Response } from "express";
import { refreshTokenLimit, loginUser } from "../services/auth.srv";

/**
 * Controlador para refrescar el token.
 * Recibe un token y, si es válido (aunque expirado), genera uno nuevo.
 */
export const refreshTokenLimitCtrl = async ({ body }: Request, res: Response) => {
    try {
        // Se espera que el body tenga la propiedad "token"
        const { token } = body;
        const response = await refreshTokenLimit(token);
        if (response === "TOKEN_NO_VALID" || response === "NOT_FOUND_USER") {
            res.status(403).send({ status: false, msg: response === "TOKEN_NO_VALID" ? "Token no válido" : "Usuario no encontrado" });
            return;
        }
        res.status(200).send({ status: true, ...response });
    } catch (error) {
        res.status(500).send({ status: false, msg: "Error al refrescar el token: " + error });
    }
};

/**
 * Controlador para el login de usuario.
 * Verifica las credenciales y genera un token si son correctas.
 */
export const loginCtrl = async ({ body }: Request, res: Response) => {
    try {
        const response = await loginUser(body);
        if (!response) {
            res.status(403).send({ status: false, msg: "Credenciales incorrectas" });
            return;
        }
        res.status(200).send({ status: true, ...response });
    } catch (error) {
        res.status(500).send({ status: false, msg: "Error al iniciar sesión: " + error });
    }
};
