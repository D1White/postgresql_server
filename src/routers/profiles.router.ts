import express from 'express'
import { ProfileCtrl } from '../controllers/profile.controller'

export const profilesRouter = express.Router()

profilesRouter.get('/', ProfileCtrl.index)
profilesRouter.get('/:id', ProfileCtrl.show)
profilesRouter.post('/', ProfileCtrl.create)
profilesRouter.patch('/:id', ProfileCtrl.update)
profilesRouter.delete('/:id', ProfileCtrl.delete)
