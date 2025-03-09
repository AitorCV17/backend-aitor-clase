import { Type } from "class-transformer";
import { IsEmail, IsEnum, IsNumber, IsPositive, IsString } from "class-validator";

/**
 * Enumeración de roles disponibles
 */
export enum Role {
  REGULAR = "REGULAR",
  ADMIN = "ADMIN"
}

/**
 * DTO para crear un usuario.
 * Se espera: nombres, correo, contraseña y rol.
 */
export class CrearUsuarioDto {
  @IsString()
  nombres: string;

  @IsEmail()
  correo: string;

  @IsString()
  contraseña: string;

  @IsEnum(Role)
  rol: Role; // Se debe enviar "REGULAR" o "ADMIN"
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

  @IsEnum(Role)
  rol: Role; // Se incluye rol para actualizarlo
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
