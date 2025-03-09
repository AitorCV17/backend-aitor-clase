import { PrismaClient, Usuario } from "@prisma/client";
import { encrypt } from "../utils/bcrypt.handle";
const prisma = new PrismaClient();

/**
 * Función para registrar un nuevo usuario.
 * Verifica que no exista otro usuario con el mismo correo.
 */
export const registerUsuario = async ({ correo, contraseña, nombres, rol }: any) => {
  const checkIs = await prisma.usuario.findFirst({ where: { correo } });
  if (checkIs?.correo) return "ALREADY EXIST";
  const passHash = await encrypt(contraseña);
  const response = await prisma.usuario.create({
    select: {
      id: true,
      correo: true,
      nombres: true,
      rol: true,
    },
    data: {
      correo,
      nombres,
      contraseña: passHash,
      // Si se envía rol se usa, de lo contrario se asigna "REGULAR" por defecto
      rol: rol ? rol : "REGULAR",
    },
  });
  return response;
};

/**
 * Función para actualizar un usuario.
 */
export const updateUsuario = async ({ id, nombres, correo, contraseña, rol }: any) => {
  const checkIs = await prisma.usuario.findFirst({ where: { id } });
  if (!checkIs) return "NO_EXISTE";
  const response = await prisma.usuario.update({
    where: { id },
    data: {
      nombres,
      correo,
      contraseña: await encrypt(contraseña),
      rol, // Actualiza el rol del usuario
    },
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
