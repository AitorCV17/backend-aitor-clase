import { PrismaClient, Usuario } from "@prisma/client";
import { encrypt } from "../utils/bcrypt.handle";
const prisma = new PrismaClient();

/**
 * Función para registrar un nuevo usuario.
 * Verifica que no exista otro usuario con el mismo email.
 */
export const registerUsuario = async ({ email, password, nombres }: Usuario) => {
    const checkIs = await prisma.usuario.findFirst({ where: { email } });
    if (checkIs?.email) return "ALREADY EXIST";
    const passHash = await encrypt(password);
    const response = await prisma.usuario.create({
        select: {
            id: true,
            email: true,
            nombres: true,
            rol: true,
        },
        data: { email, nombres, password: passHash }
    });
    return response;
};

/**
 * Función para actualizar un usuario.
 */
export const updateUsuario = async ({ id, nombres, email, password }: Usuario) => {
    const checkIs = await prisma.usuario.findFirst({ where: { id } });
    if (!checkIs) return "NO_EXISTE";
    const response = await prisma.usuario.update({
        where: { id },
        data: { nombres, email, password: await encrypt(password) }
    });
    return response;
};

/**
 * Función para obtener la lista de usuarios.
 */
export const getListUsuario = async () => {
    return await prisma.usuario.findMany();
};

/**
 * Función para obtener un usuario por su id.
 */
export const getUsuario = async (id: number) => {
    const usuario = await prisma.usuario.findFirst({ where: { id } });
    return usuario;
};

/**
 * Función para eliminar un usuario por su id.
 */
export const deleteUsuario = async (id: number) => {
    const response = await prisma.usuario.delete({ where: { id } });
    return response;
};
