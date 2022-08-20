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
routes.use(authToken)

//Rotas das Lojas
routes.post('/store', new StoreContoller().create);
routes.delete('/store/:idStore', new StoreContoller().delete);
routes.get('/store', new StoreContoller().list);

//Rotas dos cupons
routes.post('/coupon/:idStore/create', new CouponController().create);
routes.delete('/coupon/:idCoupon', new CouponController().delete);
routes.get('/coupon', new CouponController().list);

//Rota para adicionar aos favoritos -------------
routes.post('/user/:idUser/coupon/:coupon_id', new UserController().couponUser);
//---------------------------------
routes.get('/user', new UserController().list);

export default routes;