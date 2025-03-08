import { PrismaClient } from "@prisma/client";
import { CreatePersonajeDto, UpdatePersonajeDto } from "../validations/dtos/personaje.dto";

const prisma = new PrismaClient();

/**
 * CREATE
 */
export const createPersonajeSrv = async ({
  nombre,
  foto,
  especie,
  estado,
  origen,
  tipo,
  genero,
  url,
  idUsuario,
}: CreatePersonajeDto) => {
  if (!nombre) {
    return { error: "El nombre es requerido" };
  }

  const response = await prisma.personaje.create({
    data: {
      nombre,
      foto,
      especie,
      estado,
      origen,
      tipo,
      genero,
      url,
      // En lugar de usar "idUsuario" directamente:
      usuario: {
        connect: {
          id: idUsuario
        }
      }
    },
  });

  return response;
};

/**
 * READ LIST
 */
export const getListaPersonajeSrv = async (idUsuario: number) => {
  const response = await prisma.personaje.findMany({
    where: {
      idUsuario,
      flag: true,
    },
  });
  return response;
};

/**
 * READ ONE
 */
export const getPersonajeSrv = async (id: number, idUsuario: number) => {
  const response = await prisma.personaje.findFirst({
    where: {
      id,
      flag: true,
      idUsuario,
    },
  });
  if (!response) {
    return 404;
  }
  return response;
};

/**
 * DELETE (Soft Delete)
 */
export const deletePersonajeSrv = async (id: number, idUsuario: number) => {
  const isExist = await getPersonajeSrv(id, idUsuario);
  if (isExist === 404) return "No existe personaje";

  const response = await prisma.personaje.update({
    // Ojo: Este where funciona solo si tienes un índice único o 
    // un approach que permita filtrar por ambos campos. De lo contrario,
    // podrías hacer where: { id }, y primero verificar si el personaje 
    // pertenece al usuario.
    where: {
      id,
      idUsuario
    },
    data: {
      flag: false
    }
  });
  return response;
};

/**
 * UPDATE
 */
export const updatePersonajeSrv = async ({
  id,
  nombre,
  foto,
  especie,
  estado,
  origen,
  tipo,
  genero,
  url,
  idUsuario
}: UpdatePersonajeDto) => {
  // Primero verificamos que el personaje exista
  const isExist = await prisma.personaje.findFirst({
    where: { id }
  });
  if (!isExist) return "No existe personaje";
  if (isExist.idUsuario !== idUsuario) return "No tiene permiso para editar";

  // Actualizamos solo los campos que llegan (nombre, foto, etc.)
  const response = await prisma.personaje.update({
    // Mismo comentario sobre el where:
    where: {
      id,
      idUsuario
    },
    data: {
      nombre,
      foto,
      especie,
      estado,
      origen,
      tipo,
      genero,
      url
    }
  });
  return response;
};
