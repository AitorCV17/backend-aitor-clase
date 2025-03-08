import { Router } from "express";
import { readdirSync } from "fs"; // Para leer directorios

const PATH_ROUTER = `${__dirname}`; // Directorio actual
const router = Router();

/**
 * Se leen todas las rutas (excepto index.ts) y se importan dinámicamente.
 */
const cleanFileName = (fileName: string) => fileName.split(".").shift();

readdirSync(PATH_ROUTER).filter((filename) => {
  const cleanName = cleanFileName(filename);
  if (cleanName !== "index") {
    import(`./${cleanName}`).then((moduleRouter) => {
      router.use(`/${cleanName}`, moduleRouter.router);
    });
  }
});

export { router };
