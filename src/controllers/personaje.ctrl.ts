import { Request, Response } from "express";
import {
    createPersonajeSrv,
    getListaPersonajeSrv,
    getPersonajeSrv,
    deletePersonajeSrv,
    updatePersonajeSrv
} from "../services/personaje.srv";

export const createPersonajeCtrl = async ({ body }: Request, res: Response) => {
    try {
        const response = await createPersonajeSrv(body);
        if (!response) { res.status(405).json({ statusCode: 405, msg: 'No se pudo crear personaje', success: false }); return }
        res.status(200).json({ statusCode: 200, message: "Se ejecuto correctamente tu solicitud", data: response, success: true });
    } catch (error) {
        res.status(500).json({ error, success: false });
    }
};


export const getListaPersonajeCtrl = async (req: Request, res: Response) => {
    try {
        const { idUsuario } = req.body
        const response = await getListaPersonajeSrv(Number(idUsuario));
        if (!response) { res.status(404).json({ statusCode: 404, msg: 'No hay personajes', success: false }); return }
        res.status(200).json({ statusCode: 200, msg: "Personajes encontrado", data: response, success: true });
    } catch (error) {
        res.status(500).json(error);
    }
};

export const getPersonajeCtrl = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const { idUsuario } = req.body
        const response = await getPersonajeSrv(Number(id), idUsuario);
        if (response === 404) { res.status(404).json({ statusCode: 404, msg: 'No existe el personaje', success: false }); return }
        res.status(200).json({ statusCode: 200, msg: "Personaje encontrado", data: response, success: true });
    } catch (error) {
        res.status(500).json({ error, success: false });
    }
};

export const deletePersonajeCtrl = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { idUsuario } = req.body
        const response = await deletePersonajeSrv(parseInt(id), Number(idUsuario));
        res.status(200).json({ statusCode: 200, msg: "Eliminación correcta", data: response, success: true });
    } catch (error) {
        res.status(500).json({ error, success: false });
    }
};

export const updatePersonajeCtrl = async ({ body }: Request, res: Response) => {
    try {
        const response = await updatePersonajeSrv(body);
        res.status(200).json({ statusCode: 200, msg: "Modificacion correcta", data: response, success: true });
    } catch (error) {
        res.status(500).json({ error, success: false });
    }
};
