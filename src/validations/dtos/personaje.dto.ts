import { Type } from "class-transformer";
import { IsString, IsNumber, IsOptional, IsPositive } from "class-validator";

/**
 * DTO para crear un personaje.
 */
export class CreatePersonajeDto {
  @IsString()
  nombre: string;

  @IsString()
  especie: string;

  @IsString()
  estado: string;

  @IsString()
  origen: string;

  @IsString()
  tipo: string;

  @IsString()
  genero: string;

  @IsString()
  foto: string;

  @IsString()
  url: string;

  @IsNumber()
  idUsuario: number;
}

/**
 * DTO para actualizar un personaje.
 */
export class UpdatePersonajeDto {
  @IsNumber()
  @IsPositive()
  id: number;

  @IsOptional()
  @IsString()
  nombre?: string;

  @IsOptional()
  @IsString()
  especie?: string;

  @IsOptional()
  @IsString()
  estado?: string;

  @IsOptional()
  @IsString()
  origen?: string;

  @IsOptional()
  @IsString()
  tipo?: string;

  @IsOptional()
  @IsString()
  genero?: string;

  @IsOptional()
  @IsString()
  foto?: string;

  @IsOptional()
  @IsString()
  url?: string;

  @IsNumber()
  @IsPositive()
  idUsuario: number;
}

/**
 * DTO para obtener un personaje por id.
 */
export class GetPersonajeDto {
  @IsNumber()
  @IsPositive()
  @Type(() => Number)
  id: number;
}
