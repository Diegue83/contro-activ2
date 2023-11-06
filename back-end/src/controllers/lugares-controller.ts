import { Request,Response } from "express";
import { pool } from "../database";

class LugaresController{

    async getLug(req:Request,res:Response){
        const result=await pool.query('SELECT * FROM lugares');
        res.json(result[0])
    }

    async insLug(req:Request, res: Response){
        await pool.query('INSERT INTO LUGARES SET ?',[req.body]);
        res.json({Message:'Se inserto correctamente'});
    }

    async getLastLug(req:Request, res: Response){
        const result=await pool.query('SELECT * FROM lugares ORDER by idLug DESC LIMIT 1;');
        res.json(result[0])
    }
}

export const lugaresController= new LugaresController;