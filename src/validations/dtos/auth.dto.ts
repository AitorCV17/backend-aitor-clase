import { IsString, IsEmail } from "class-validator";

/**
 * DTO para el login.
 */
export class LoginDto {
    @IsEmail()
    correo: string;

    @IsString()
    contraseña: string;
}

/**
 * DTO para refrescar el token.
 */
export class tokenDto {
    @IsString()
    token: string;
}
