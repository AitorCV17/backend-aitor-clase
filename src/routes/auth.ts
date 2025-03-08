import { Router } from "express";
import { loginCtrl, refreshTokenLimitCtrl } from "../controllers/auth.ctrl";
import { LoginDto, tokenDto } from "../validations/dtos/auth.dto";
import { validateBodyDto } from "../middlewares/validate-dto";

const router = Router();

/**
 * Ruta para el login.
 * Ejemplo: POST http://localhost:3010/auth/login
 */
router.post("/login", validateBodyDto(LoginDto), loginCtrl);

/**
 * Ruta para refrescar el token.
 * Ejemplo: POST http://localhost:3010/auth/refresh-token
 */
router.post("/refresh-token", validateBodyDto(tokenDto), refreshTokenLimitCtrl);

export { router };
