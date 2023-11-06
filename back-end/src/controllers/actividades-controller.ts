import {Request,Response} from 'express';
import {pool} from "../database";

class ActividadesController{
    async getAct(req:Request,res:Response){
        const hoy = new Date();
        hoy.setDate(hoy.getDate());
        const diaStr = hoy.toISOString().slice(0, 10);
        const result=await pool.query('SELECT * FROM vis_act WHERE fecha >= ?;',diaStr)
        res.json(result[0]);
        
    }
    async getActEnded(req:Request,res:Response){
        console.log(1)
        const hoy = new Date();
        hoy.setDate(hoy.getDate());
        const diaStr = hoy.toISOString().slice(0, 10);
        console.log(0)
        const result=await pool.query('SELECT * FROM vis_act WHERE fecha <= ?',[diaStr])
        res.json(result[0]);
    }
    async getByIdAct(req:Request,res:Response){
        const {idAct}=req.params;
        const result=await pool.query('SELECT * From vis_act where idAct= ?',[idAct]);
        res.json(result[0]);
    }
    async getByUsrAct(req: Request, res:Response){
        const {idUsr}=req.params
        const result=await pool.query('SELECT * FROM vis_act where idUsr= ?',[idUsr]);
        res.json(result[0]);
    }

    async insertAct(req:Request,res:Response){
        await pool.query('INSERT INTO Actividades SET ?',[req.body]);
        res.json({Message:'Se inserto correctamente'});
    }
    async updateAct(req:Request,res:Response){
        const {idAct}=req.params;
        await pool.query('UPDATE Actividades SET ? WHERE idAct=?',[req.body,idAct]);
        res.json({mesagge:'Se ha actualizado con exito'});
    }
    async deleteAct(req:Request,res:Response){
        const {idAct}=req.params;
        await pool.query('DELETE FROM Actividades WHERE idAct=?',[idAct]);
        res.json({Message:'Se ha eliminado correctamente'});
    }
    
}

export const actividadesController= new ActividadesController;