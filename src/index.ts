import 'express-async-errors';
import express from 'express';
import { AppDataSource } from './data-souce';
import { errorMiddleware } from './middlewares/error';
import routes from './routes';

//Cria o express após iniciar o banco de dados
AppDataSource.initialize().then(() => {
    const app = express();

    const port = process.env.PORT || 3000;

    app.use(express.json());

    app.get('/', (req, res) => {
        return res.json({ msg: "Api works!" });
    })

    app.use(routes);

    app.use(errorMiddleware);
    return app.listen(port);
})