import { RequestHandler } from "express";
import {
  createPersonajeSrv,
  getListaPersonajeSrv,
  getPersonajeSrv,
  deletePersonajeSrv,
  updatePersonajeSrv
} from "../services/personaje.srv";

/**
 * Controlador para crear un personaje.
 */
export const createPersonajeCtrl: RequestHandler = async (req, res) => {
  try {
    const response = await createPersonajeSrv(req.body);
    if (!response || (response as any).error) {
      res.status(405).json({
        statusCode: 405,
        msg: (response as any).error || "No se pudo crear el personaje",
        success: false
      });
      return;
    }
    res.status(200).json({
      statusCode: 200,
      msg: "Personaje creado correctamente",
      data: response,
      success: true
    });
  } catch (error) {
    res.status(500).json({ msg: "Error al crear el personaje: " + error, success: false });
  }
};

/**
 * Controlador para listar los personajes del usuario autenticado.
 */
export const getListaPersonajeCtrl: RequestHandler = async (req, res) => {
  try {
    const { idUsuario } = req.body;
    const response = await getListaPersonajeSrv(Number(idUsuario));
    if (!response) {
      res.status(404).json({
        statusCode: 404,
        msg: "No se encontraron personajes",
        success: false
      });
      return;
    }
    res.status(200).json({
      statusCode: 200,
      msg: "Personajes obtenidos correctamente",
      data: response,
      success: true
    });
  } catch (error) {
    res.status(500).json({ msg: "Error al listar personajes: " + error, success: false });
  }
};

/**
 * Controlador para obtener un personaje específico.
 */
export const getPersonajeCtrl: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const { idUsuario } = req.body;
    const response = await getPersonajeSrv(Number(id), Number(idUsuario));
    if (response === 404) {
      res.status(404).json({
        statusCode: 404,
        msg: "El personaje no existe",
        success: false
      });
      return;
    }
    res.status(200).json({
      statusCode: 200,
      msg: "Personaje obtenido correctamente",
      data: response,
      success: true
    });
  } catch (error) {
    res.status(500).json({ msg: "Error al obtener el personaje: " + error, success: false });
  }
};

/**
 * Controlador para eliminar (soft-delete) un personaje.
 */
export const deletePersonajeCtrl: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const { idUsuario } = req.body;
    const response = await deletePersonajeSrv(Number(id), Number(idUsuario));
    res.status(200).json({
      statusCode: 200,
      msg: "Personaje eliminado correctamente",
      data: response,
      success: true
    });
  } catch (error) {
    res.status(500).json({ msg: "Error al eliminar el personaje: " + error, success: false });
  }
};

/**
 * Controlador para actualizar un personaje.
 */
export const updatePersonajeCtrl: RequestHandler = async (req, res) => {
  try {
    const response = await updatePersonajeSrv(req.body);
    if (typeof response === "string") {
      res.status(400).json({
        statusCode: 400,
        msg: response,
        success: false
      });
      return;
    }
    res.status(200).json({
      statusCode: 200,
      msg: "Personaje actualizado correctamente",
      data: response,
      success: true
    });
  } catch (error) {
    res.status(500).json({ msg: "Error al actualizar el personaje: " + error, success: false });
  }
};
