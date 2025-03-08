import express from "express";
import cors from "cors";
import "dotenv/config";
import { router } from "./routes";
import "reflect-metadata";

const PORT = process.env.PORT || 3010;
const app = express();

// Configuración de middlewares para analizar JSON y habilitar CORS
app.use(express.json());
app.use(cors());

// Se importan las rutas de la aplicación
app.use(router);

// Arranque del servidor
app.listen(PORT, () => console.log(`Listo por el puerto ${PORT}`));
