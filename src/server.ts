import dotenv from 'dotenv'
dotenv.config()

import 'reflect-metadata'
import { createConnection } from 'typeorm'
import express, { Request, Response } from 'express'
import cors from 'cors'
import { usersRouter } from './routers/user.router'
import { profilesRouter } from './routers/profiles.router'

createConnection()
  .then(async (connection) => {
    const app = express()
    app.use(cors())
    app.use(express.json())

    app.get('/', (_: Request, res: Response) => {
      res.json('succes')
    })

    app.use('/api/users', usersRouter)

    app.use('/api/profiles', profilesRouter)

    app.listen(process.env.PORT, () => {
      console.log(`SERVER RUNNING at http://localhost:${process.env.PORT}`)
    })
  })
  .catch((error) => console.log(error))
