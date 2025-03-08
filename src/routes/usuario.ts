import { Router } from "express";
import {
    createUsuarioCtrl,
    getListaUsuarioCtrl,
    getUsuarioCtrl,
    deleteUsuarioCtrl,
    updateUsuarioCtrl,
} from "../controllers/usuario.ctrl";
import { validateBodyDto, validateParamsDto } from "../middlewares/validate-dto";
import { RolUsuario } from "@prisma/client";
import { rolRequired } from "../middlewares/rol.md";
import { CrearUsuarioDto, ModificarUsuarioDto, GetUsuarioDto } from "../validations/dtos/usuario.dto";

const router = Router();

/**
 * Todas las rutas de usuarios requieren que el usuario autenticado sea ADMIN.
 */

// Crear un nuevo usuario (solo ADMIN)
router.post("/", rolRequired(RolUsuario.ADMIN), validateBodyDto(CrearUsuarioDto), createUsuarioCtrl);

// Listar todos los usuarios (solo ADMIN)
router.get("/list", rolRequired(RolUsuario.ADMIN), getListaUsuarioCtrl);

// Obtener un usuario en particular por su id (solo ADMIN)
router.get("/only/:id", rolRequired(RolUsuario.ADMIN), validateParamsDto(GetUsuarioDto), getUsuarioCtrl);

// Actualizar un usuario existente (solo ADMIN)
router.put("/", rolRequired(RolUsuario.ADMIN), validateBodyDto(ModificarUsuarioDto), updateUsuarioCtrl);

// Eliminar un usuario (solo ADMIN)
router.delete("/:id", rolRequired(RolUsuario.ADMIN), validateParamsDto(GetUsuarioDto), deleteUsuarioCtrl);

export { router };
