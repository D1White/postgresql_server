import { Request, Response } from 'express'
import { validate } from 'class-validator'

import { User } from '../entity/User'
import { generateMD5 } from '../utils/generateHash'

class UserController {
  async index(_: Request, res: Response) {
    try {
      const users = await User.find()

      res.json(users)
    } catch (error) {
      res.status(500).json(error)
    }
  }

  async show(req: Request, res: Response) {
    try {
      const id = req.params.id

      const user = await User.createQueryBuilder('user')
        .leftJoinAndSelect('user.profiles', 'profile')
        .where('user.id = :id', { id })
        .getOne()

      if (!user) {
        res.status(404).json({ user: 'User not found' })
        return
      }

      return res.json(user)
    } catch (error) {
      res.status(500).json(error)
    }
  }

  async create(req: Request, res: Response) {
    try {
      const data = {
        username: req.body.username,
        email: req.body.email,
        password: generateMD5(req.body.password + process.env.SECRET_KEY),
        isAdmin: req.body.isAdmin,
      }

      const user = await User.create(data)

      const errors = await validate(user)
      if (errors.length > 0) throw errors

      await user.save()

      return res.status(201).json(user)
    } catch (error) {
      res.status(500).json(error)
    }
  }

  async update(req: Request, res: Response) {
    try {
      const id = req.params.id

      const user = await User.findOne(id)

      if (!user) {
        res.status(404).json({ user: 'User not found' })
        return
      }

      user.username = req.body.username || user.username
      user.email = req.body.email || user.email
      user.password = req.body.password || user.password
      user.isAdmin = req.body.isAdmin || user.isAdmin

      await user.save()

      return res.json(user)
    } catch (error) {
      res.status(500).json(error)
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const id = req.params.id

      const user = await User.findOne(id)

      if (!user) {
        res.status(404).json({ user: 'User not found' })
        return
      }

      await user.remove()

      return res.status(204)
    } catch (error) {
      res.status(500).json(error)
    }
  }
}

export const UserCtrl = new UserController()
