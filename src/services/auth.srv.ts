import { PrismaClient, Usuario } from "@prisma/client";
const prisma = new PrismaClient();
import { encrypt, verified } from "../utils/bcrypt.handle";
import { verify } from "jsonwebtoken";
import { generateTokenLimitTime } from "../utils/jwt.handle";
import { getUsuario } from "./usuario.srv";

/**
 * Función para refrescar el token.
 * Verifica el token ignorando la expiración, extrae la información y genera uno nuevo.
 */
export const refreshTokenLimit = async (token: string) => {
    try {
        const payload = verify(token, process.env.JWT_SECRET || "Tokenprueba", { ignoreExpiration: true }) as any;
        const { id, correo, nombres } = payload;
        const user = await getUsuario(id);
        if (!user) return "NOT_FOUND_USER";
        // Se genera un nuevo token con expiración de 2 horas
        const newToken = await generateTokenLimitTime(correo, nombres, id);
        return { nombres, correo, token: newToken };
    } catch (error) {
        return "TOKEN_NO_VALID";
    }
};

/**
 * Función para realizar el login del usuario.
 * Verifica credenciales y genera un token en caso de éxito.
 */
export const loginUser = async ({ correo, contraseña }: any) => {
    const user = await prisma.usuario.findFirst({ where: { correo } });
    if (!user?.id) return;
    const passwordHash = user.contraseña;
    const isCorrect = await verified(contraseña, passwordHash);
    if (!isCorrect) return;
    const token = await generateTokenLimitTime(user.correo, user.nombres, user.id);
    return { nombres: user.nombres, correo: user.correo, token };
};
