import { Type } from "class-transformer";
import { IsEmail, IsNumber, IsPositive, IsString } from "class-validator";

/**
 * DTO para crear un usuario.
 */
export class CrearUsuarioDto {
    @IsEmail()
    email: string;

    @IsString()
    password: string;

    @IsString()
    nombres: string;
}

/**
 * DTO para modificar un usuario.
 */
export class ModificarUsuarioDto {
    @IsNumber()
    @IsPositive()
    id: number;

    @IsEmail()
    email: string;

    @IsString()
    password: string;

    @IsString()
    nombres: string;
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
