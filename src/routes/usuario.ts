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

// Ahora, la creación de usuarios también solo lo puede hacer un ADMIN
router.post("/", rolRequired(RolUsuario.ADMIN), validateBodyDto(CrearUsuarioDto), createUsuarioCtrl);

router.get("/list", rolRequired(RolUsuario.ADMIN), getListaUsuarioCtrl);

router.get("/only/:id", validateParamsDto(GetUsuarioDto), rolRequired(RolUsuario.ADMIN), getUsuarioCtrl);

router.delete("/:id", validateParamsDto(GetUsuarioDto), rolRequired(RolUsuario.ADMIN), deleteUsuarioCtrl);

router.put("/", rolRequired(RolUsuario.ADMIN), validateBodyDto(ModificarUsuarioDto), updateUsuarioCtrl);

export { router };
