import { IsString, IsEmail } from "class-validator";

/**
 * DTO para el login.
 */
export class LoginDto {
    @IsEmail()
    email: string;

    @IsString()
    password: string;
}

/**
 * DTO para refrescar el token.
 */
export class tokenDto {
    @IsString()
    token: string;
}
