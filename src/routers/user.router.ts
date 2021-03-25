import express from 'express'
import { UserCtrl } from '../controllers/user.controller'

export const usersRouter = express.Router()

usersRouter.get('/', UserCtrl.index)
usersRouter.get('/:id', UserCtrl.show)
usersRouter.post('/', UserCtrl.create)
usersRouter.patch('/:id', UserCtrl.update)
usersRouter.delete('/:id', UserCtrl.delete)
