import dotenv from 'dotenv'
dotenv.config()

import 'reflect-metadata'
import { createConnection } from 'typeorm'
import express, { Request, Response } from 'express'
import cors from 'cors'
import { UserCtrl } from './controllers/user.controller'

createConnection()
  .then(async (connection) => {
    const app = express()
    app.use(cors())
    app.use(express.json())

    app.get('/', (_: Request, res: Response) => {
      res.json('succes')
    })

    app.get('/users', UserCtrl.index)
    app.get('/users/:id', UserCtrl.show)
    app.post('/users', UserCtrl.create)

    app.listen(process.env.PORT, () => {
      console.log(`SERVER RUNNING at http://localhost:${process.env.PORT}`)
    })

    // console.log("Inserting a new user into the database...");
    // const user = new User();
    // user.firstName = "Timber";
    // user.lastName = "Saw";
    // user.age = 25;
    // await connection.manager.save(user);
    // console.log("Saved a new user with id: " + user.id);

    // console.log("Loading users from the database...");
    // const users = await connection.manager.find(User);
    // console.log("Loaded users: ", users);

    // console.log("Here you can setup and run express/koa/any other framework.");
  })
  .catch((error) => console.log(error))
