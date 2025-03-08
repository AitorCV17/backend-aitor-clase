import Joi from "joi";
import { Request, Response, NextFunction } from "express";

/**
 * Validación para crear un personaje.
 */
export const createPersonajeValidation = (req: Request, res: Response, next: NextFunction) => {
    try {
        const schema = Joi.object({
            nombre: Joi.string().required(),
            foto: Joi.string().required(),
        });
        const { error } = schema.validate(req.body);
        if (error) {
            res.status(400).json({ msg: error.details[0].message });
            return;
        }
        next();
    } catch (error) {
        res.status(500).json({ msg: "Error interno del servidor" });
    }
};

/**
 * Validación para actualizar un personaje.
 */
export const updatePersonajeValidation = (req: Request, res: Response, next: NextFunction) => {
    try {
        const schema = Joi.object({
            id: Joi.number().required(),
            nombre: Joi.string(),
            foto: Joi.string(),
        });
        const { error } = schema.validate(req.body);
        if (error) {
            res.status(400).json({ msg: error.details[0].message });
            return;
        }
        next();
    } catch (error) {
        res.status(500).json({ msg: "Error interno del servidor" });
    }
};

/**
 * Validación para obtener un personaje.
 */
export const getPersonajeValidation = (req: Request, res: Response, next: NextFunction) => {
    try {
        const schema = Joi.object({
            id: Joi.number().required(),
        });
        const { error } = schema.validate(req.body);
        if (error) {
            res.status(400).json({ msg: error.details[0].message });
            return;
        }
        next();
    } catch (error) {
        res.status(500).json({ msg: "Error interno del servidor" });
    }
};

/**
 * Validación para eliminar un personaje.
 */
export const deletePersonajeValidation = (req: Request, res: Response, next: NextFunction) => {
    try {
        const schema = Joi.object({
            id: Joi.number().required(),
        });
        const { error } = schema.validate(req.body);
        if (error) {
            res.status(400).json({ msg: error.details[0].message });
            return;
        }
        next();
    } catch (error) {
        res.status(500).json({ msg: "Error interno del servidor" });
    }
};
