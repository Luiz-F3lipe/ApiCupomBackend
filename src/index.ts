import express from 'express'
import { AppDataSource } from './data-souce'

AppDataSource.initialize().then(() => {
    const app = express()

    app.use(express.json())

    app.get('/', (req, res) => {
        res.json('Api Works!')
    })

    return app.listen(3000)
})