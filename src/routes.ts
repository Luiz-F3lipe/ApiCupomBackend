import { Router } from "express";
import { StoreContoller } from "./controllers/StoreController";

const routes = Router();

routes.post('/store', new StoreContoller().create);
routes.post('/coupon/:idStore/create', new StoreContoller().createCoupon);
routes.delete('/store/:idStore', new StoreContoller().delete);

export default routes;