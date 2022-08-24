import { Router } from "express";
import { AuthenticationController } from "./controllers/AuthenticationController";
import { CouponController } from "./controllers/CouponController";
import { StoreContoller } from "./controllers/StoreController";
import { UserController } from "./controllers/UserController";
import { authToken } from "./middlewares/authMiddleware";

const routes = Router({ mergeParams: true });

//Rotas Usuarios
routes.post('/user', new UserController().create);

//Rota de Login
routes.post('/login', new AuthenticationController().login);

/// precias autenticação
//routes.use(authToken)

//Rotas das Lojas
routes.post('/store', new StoreContoller().create);
routes.delete('/store/:idStore', new StoreContoller().delete);
routes.get('/stores', new StoreContoller().list);
routes.get('/store/:idStore', new StoreContoller().listOne);

//Rotas dos cupons
routes.post('/coupon/:idStore/create', new CouponController().create);
routes.delete('/coupon/:idCoupon', new CouponController().delete);
routes.get('/coupons', new CouponController().list);
routes.get('/coupon/:idCoupon', new CouponController().listOne);

//Rotas dos Usuarios
//Rota para adicionar aos favoritos -------------
routes.post('/user/:idUser/coupon/:coupon_id', new UserController().couponUser);
//---------------------------------
routes.get('/users', new UserController().list);
routes.get('/user/:idUser', new UserController().listById);

export default routes;