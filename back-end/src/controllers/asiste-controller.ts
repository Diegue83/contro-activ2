import { Request, Response } from 'express';
import { pool } from "../database";

class AsisteController {

    async getasis(req: Request, res: Response) {
        const result = await pool.query('SELECT * FROM asistencia;');
        res.json(result[0]);
    }

    async getByIdasis(req: Request, res: Response) {
        const { numCon } = req.params;
        const result = await pool.query('SELECT * FROM asistencia WHERE numCon = ?', [numCon]);
        res.json(result[0]); 
    }
}

export const asistenciaController = new AsisteController();