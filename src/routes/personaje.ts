import { Router } from "express";
import {
  createPersonajeCtrl,
  getListaPersonajeCtrl,
  getPersonajeCtrl,
  deletePersonajeCtrl,
  updatePersonajeCtrl
} from "../controllers/personaje.ctrl";
import { ValidateSession } from "../middlewares/sesion.md";

const router = Router();

/**
 * Ruta para listar los personajes del usuario autenticado.
 * Ejemplo: GET http://localhost:3010/personaje/list
 */
router.get("/list", ValidateSession, getListaPersonajeCtrl);

/**
 * Ruta para obtener un personaje específico.
 * Ejemplo: GET http://localhost:3010/personaje/only/:id
 */
router.get("/only/:id", ValidateSession, getPersonajeCtrl);

/**
 * Ruta para crear un nuevo personaje.
 * Ejemplo: POST http://localhost:3010/personaje
 */
router.post("/", ValidateSession, createPersonajeCtrl);

/**
 * Ruta para actualizar un personaje existente.
 * Ejemplo: PUT http://localhost:3010/personaje
 */
router.put("/", ValidateSession, updatePersonajeCtrl);

/**
 * Ruta para eliminar (soft-delete) un personaje.
 * Ejemplo: DELETE http://localhost:3010/personaje/:id
 */
router.delete("/:id", ValidateSession, deletePersonajeCtrl);

export { router };
