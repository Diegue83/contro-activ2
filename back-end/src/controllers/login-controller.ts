import {Request,Response} from 'express';
import {pool} from "../database";

class LoginnController{
    async getUsers(req:Request,res:Response){
        const result=await pool.query('SELECT * FROM usuarios')
        res.json(result[0]);
    }
    async getByIdUsr(req:Request,res:Response){
        const {id}=req.params;
    
        const result=await pool.query('SELECT * FROM usuarios WHERE idUsr=?',[id]);
        res.json(result[0]);    
    }

    async getUsr(req:Request,res:Response){
        const {usr}=req.params;
        const {pwd}=req.params;
    
        const result=await pool.query('SELECT * FROM usuarios WHERE usr=? AND pwd=?',[usr, pwd]);
        res.json(result[0]);
    }

    async getUser(req:Request,res:Response){
        const {usr}=req.params;
    
        const result=await pool.query('SELECT * FROM usuarios WHERE usr=? AND pwd=?',[usr, req.body.pwd]);
        res.json(result[0]);
    }

    
    async insertUsr(req:Request,res:Response){
        await pool.query('INSERT INTO usuarios SET ?',[req.body]);
        res.json({Message:'Se inserto correctamente'})
    }
    
   
    async updateUsr(req:Request,res:Response){
        const {id}=req.params;
        await pool.query('UPDATE usuarios SET ? WHERE idUsr=?',[req.body,id]);
        res.json({mesagge:'Se ha actualizado con exito'});
    }
    async deleteUsr(req:Request,res:Response){
        const {id}=req.params;
        await pool.query('DELETE FROM usuarios WHERE idUsr=?',[id]);
        res.json({Message:'Se ha eliminado correctamente'});
    }
}

export const loginnController= new LoginnController;