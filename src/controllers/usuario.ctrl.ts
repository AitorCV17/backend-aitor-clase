import { Request, Response } from "express";
import {
    deleteUsuario,
    getListUsuario,
    getUsuario,
    registerUsuario,
    updateUsuario
} from "../services/usuario.srv";

/**
 * Controlador para crear un usuario.
 * Solo se podrá crear si el usuario autenticado es ADMIN.
 */
export const createUsuarioCtrl = async ({ body }: Request, res: Response) => {
    try {
        const response = await registerUsuario(body);
        if (response === "ALREADY EXIST") {
            res.status(400).json({ 
                msg: "El usuario ya existe", 
                datos: response, 
                exito: false 
            });
            return;
        }
        res.status(200).json({ 
            msg: "Usuario creado correctamente", 
            datos: response, 
            exito: true 
        });
    } catch (error) {
        res.status(500).json({ 
            msg: "Error al crear el usuario: " + error, 
            exito: false 
        });
    }
};

/**
 * Controlador para obtener la lista de usuarios.
 */
export const getListaUsuarioCtrl = async (req: Request, res: Response) => {
    try {
        const response = await getListUsuario();
        res.status(200).json({ 
            msg: "Lista de usuarios obtenida correctamente", 
            datos: response, 
            exito: true 
        });
    } catch (error) {
        res.status(500).json({ 
            msg: "Error al obtener la lista de usuarios: " + error, 
            exito: false 
        });
    }
};

/**
 * Controlador para obtener un usuario por su id.
 */
export const getUsuarioCtrl = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const response = await getUsuario(Number(id));
        if (!response) {
            res.status(404).json({ 
                msg: "El usuario no existe", 
                exito: false 
            });
            return;
        }
        res.status(200).json({ 
            msg: "Usuario obtenido correctamente", 
            datos: response, 
            exito: true 
        });
    } catch (error) {
        res.status(500).json({ 
            msg: "Error al obtener el usuario: " + error, 
            exito: false 
        });
    }
};

/**
 * Controlador para actualizar un usuario.
 */
export const updateUsuarioCtrl = async ({ body }: Request, res: Response) => {
    try {
        const response = await updateUsuario(body);
        res.status(200).json({ 
            msg: "Usuario actualizado correctamente", 
            datos: response, 
            exito: true 
        });
    } catch (error) {
        res.status(500).json({ 
            msg: "Error al actualizar el usuario: " + error, 
            exito: false 
        });
    }
};

/**
 * Controlador para eliminar un usuario.
 */
export const deleteUsuarioCtrl = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const response = await deleteUsuario(Number(id));
        res.status(200).json({ 
            msg: "Usuario eliminado correctamente", 
            datos: response, 
            exito: true 
        });
    } catch (error) {
        res.status(500).json({ 
            msg: "Error al eliminar el usuario: " + error, 
            exito: false 
        });
    }
};
