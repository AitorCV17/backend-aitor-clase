-- CreateEnum
CREATE TYPE "RolUsuario" AS ENUM ('REGULAR', 'ADMIN');

-- CreateTable
CREATE TABLE "Personaje" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "especie" TEXT NOT NULL,
    "estado" TEXT NOT NULL,
    "origen" TEXT NOT NULL,
    "tipo" TEXT NOT NULL,
    "genero" TEXT NOT NULL,
    "foto" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "flag" BOOLEAN NOT NULL DEFAULT true,
    "idUsuario" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Personaje_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Usuario" (
    "id" SERIAL NOT NULL,
    "nombres" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "rol" "RolUsuario" NOT NULL DEFAULT 'REGULAR',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_email_key" ON "Usuario"("email");

-- AddForeignKey
ALTER TABLE "Personaje" ADD CONSTRAINT "Personaje_idUsuario_fkey" FOREIGN KEY ("idUsuario") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
