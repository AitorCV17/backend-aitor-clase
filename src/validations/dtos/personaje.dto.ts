import { Type } from "class-transformer";
import { 
  IsString, 
  IsNumber, 
  IsOptional, 
  IsPositive
} from "class-validator";

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

export class GetPersonajeDto {
  @IsNumber()
  @IsPositive()
  @Type(() => Number)
  id: number;
}
