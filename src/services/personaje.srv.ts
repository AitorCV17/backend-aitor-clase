import { PrismaClient, Personaje } from "@prisma/client";
const prisma = new PrismaClient();

/**
 * Función para crear un personaje.
 * Retorna el objeto Personaje o un error si falta algún campo.
 */
export const createPersonajeSrv = async (data: {
  nombre: string;
  foto: string;
  especie: string;
  estado: string;
  origen: string;
  tipo: string;
  genero: string;
  url: string;
  idUsuario: number;
}): Promise<Personaje | { error: string }> => {
  if (!data.nombre) {
    return { error: "El nombre es requerido" };
  }
  const response = await prisma.personaje.create({
    data: {
      nombre: data.nombre,
      foto: data.foto,
      especie: data.especie,
      estado: data.estado,
      origen: data.origen,
      tipo: data.tipo,
      genero: data.genero,
      url: data.url,
      usuario: {
        connect: { id: data.idUsuario }
      }
    }
  });
  return response;
};

/**
 * Función para listar los personajes de un usuario (solo los que tienen flag true).
 */
export const getListaPersonajeSrv = async (idUsuario: number): Promise<Personaje[] | null> => {
  const response = await prisma.personaje.findMany({
    where: { idUsuario, flag: true },
    orderBy: { id: "desc" }
  });
  return response || null;
};

/**
 * Función para obtener un personaje específico.
 */
export const getPersonajeSrv = async (id: number, idUsuario: number): Promise<Personaje | 404> => {
  const response = await prisma.personaje.findFirst({
    where: { id, idUsuario, flag: true }
  });
  if (!response) return 404;
  return response;
};

/**
 * Función para eliminar (soft-delete) un personaje.
 */
export const deletePersonajeSrv = async (id: number, idUsuario: number): Promise<Personaje | string> => {
  const isExist = await prisma.personaje.findFirst({
    where: { id, idUsuario, flag: true }
  });
  if (!isExist) return "El personaje no existe";
  const response = await prisma.personaje.update({
    where: { id },
    data: { flag: false }
  });
  return response;
};

/**
 * Función para actualizar un personaje.
 */
export const updatePersonajeSrv = async (data: {
  id: number;
  nombre?: string;
  foto?: string;
  especie?: string;
  estado?: string;
  origen?: string;
  tipo?: string;
  genero?: string;
  url?: string;
  idUsuario: number;
}): Promise<Personaje | string> => {
  const isExist = await prisma.personaje.findFirst({
    where: { id: data.id, idUsuario: data.idUsuario, flag: true }
  });
  if (!isExist) return "El personaje no existe";
  const response = await prisma.personaje.update({
    where: { id: data.id },
    data: {
      nombre: data.nombre,
      foto: data.foto,
      especie: data.especie,
      estado: data.estado,
      origen: data.origen,
      tipo: data.tipo,
      genero: data.genero,
      url: data.url
    }
  });
  return response;
};
