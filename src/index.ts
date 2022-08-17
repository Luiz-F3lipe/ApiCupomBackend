import express from 'express'
import { AppDataSource } from './data-souce'
import routes from './routes'

//Cria o express após iniciar o banco de dados
AppDataSource.initialize().then(() => {
    const app = express()

    app.use(express.json())

    app.use(routes)

    return app.listen(3000)
})