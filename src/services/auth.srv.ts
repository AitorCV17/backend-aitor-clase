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
        const { id, email, nombres } = payload;
        const user = await getUsuario(id);
        if (!user) return "NOT_FOUND_USER";
        // Se genera un nuevo token con expiración de 2 horas
        const newToken = await generateTokenLimitTime(email, nombres, id);
        return { nombres, email, token: newToken };
    } catch (error) {
        return "TOKEN_NO_VALID";
    }
};

/**
 * Función para realizar el login del usuario.
 * Verifica credenciales y genera un token en caso de éxito.
 */
export const loginUser = async ({ email, password }: Usuario) => {
    const user = await prisma.usuario.findFirst({ where: { email } });
    if (!user?.id) return;
    const passwordHash = user.password;
    const isCorrect = await verified(password, passwordHash);
    if (!isCorrect) return;
    const token = await generateTokenLimitTime(user.email, user.nombres, user.id);
    return { nombres: user.nombres, email: user.email, token };
};
