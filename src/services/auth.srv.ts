
import { PrismaClient, Usuario } from "@prisma/client";
const prisma = new PrismaClient();
import { encrypt, verified } from "../utils/bcrypt.handle";
import { verifyToken, generateTokenLimitTime, getUserToken } from "../utils/jwt.handle";
import { getUsuario } from "./usuario.srv";

export const refreshTokenLimit = async (token: string) => {
    let isValidToken = await verifyToken(token)
    if (!isValidToken) return "TOKEN_NO_VALID";

    let { id } = await getUserToken(token) as Usuario
    const { nombres, email } = await getUsuario(id)
    if (!email) return "NOT_FOUND_USER";

    const newToken = await generateTokenLimitTime(email, nombres, id);
    return { nombres, email, token: newToken };
};

export const loginUser = async ({ email, password }: Usuario) => {
    const user = await prisma.usuario.findFirst({ where: { email } });
    if (!user?.id) return;
    const passwordHash = user.password;
    const isCorrect = await verified(password, passwordHash);
    if (!isCorrect) return;
    const token = await generateTokenLimitTime(user.email, user.nombres, user.id);
    return { nombres: user.nombres, email: user.email, token };
};
