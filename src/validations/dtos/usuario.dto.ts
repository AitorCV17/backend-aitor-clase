import { Type } from "class-transformer";
import { IsEmail, IsNumber, IsPositive, IsString } from "class-validator";

/**
 * DTO para crear un usuario.
 * Se espera: primero nombres, luego correo y por último contraseña.
 */
export class CrearUsuarioDto {
    @IsString()
    nombres: string;

    @IsEmail()
    correo: string;

    @IsString()
    contraseña: string;
}

/**
 * DTO para modificar un usuario.
 */
export class ModificarUsuarioDto {
    @IsNumber()
    @IsPositive()
    id: number;

    @IsString()
    nombres: string;

    @IsEmail()
    correo: string;

    @IsString()
    contraseña: string;
}

/**
 * DTO para obtener un usuario por id.
 */
export class GetUsuarioDto {
    @IsNumber()
    @IsPositive()
    @Type(() => Number)
    id: number;
}
