import { Router } from "express";
import { CouponController } from "./controllers/CouponController";
import { StoreContoller } from "./controllers/StoreController";
import { UserController } from "./controllers/UserController";

const routes = Router();

//Rotas das Lojas
routes.post('/store', new StoreContoller().create);
routes.delete('/store/:idStore', new StoreContoller().delete);
routes.get('/store', new StoreContoller().list);

//Rotas dos cupons
routes.post('/coupon/:idStore/create', new CouponController().create);
routes.delete('/coupon/:idCoupon', new CouponController().delete);
routes.get('/coupon', new CouponController().list);

//Rotas Usuarios
routes.post('/user', new UserController().create);
routes.post('/user/:idUser/coupon', new UserController().couponUser);
routes.get('/user', new UserController().list);

//Rota de Login
routes.post('/login', new UserController().login);


//Rota Profile
routes.get('/profile', new UserController().getProfile);
export default routes;