import { Router } from "express";
import { actividadesController } from "../controllers/actividades-controller";

class ActRoutes{
    public router: Router=Router();

    constructor(){
        this.config();
    }

    config():void{
        this.router.get('/',actividadesController.getAct);
        this.router.get('/finalizada/',actividadesController.getActEnded);
        this.router.get('/:idAct',actividadesController.getByIdAct);
        this.router.get('/usuarios/:idUsr',actividadesController.getByUsrAct);
        this.router.post('/',actividadesController.insertAct);
        this.router.put('/:idAct',actividadesController.updateAct);
        this.router.delete('/:idAct',actividadesController.deleteAct)
    }
}

const actRoutes=new ActRoutes();
export default actRoutes.router;