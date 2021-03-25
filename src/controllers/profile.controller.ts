import { Request, Response } from 'express'
import { validate } from 'class-validator'

import { Profile } from '../entity/Profile'
import { User } from '../entity/User'

class ProfileController {
  async index(_: Request, res: Response) {
    try {
      const profiles = await Profile.find({ relations: ['user'] })

      res.json(profiles)
    } catch (error) {
      res.status(500).json(error)
    }
  }

  async show(req: Request, res: Response) {
    try {
      const id = req.params.id

      const profile = await Profile.findOne(id)

      if (!profile) {
        res.status(404).json({ profile: 'Profile not found' })
        return
      }

      return res.json(profile)
    } catch (error) {
      res.status(500).json(error)
    }
  }

  async create(req: Request, res: Response) {
    try {
      const userId = req.body.user_id

      const user = await User.findOne(userId)

      if (!user) {
        res.status(404).json({ user: `User with id ${userId} not found` })
        return
      }

      const data = {
        name: req.body.name,
        gender: req.body.gender,
        birthdate: req.body.birthdate,
        city: req.body.city,
        user: user,
      }

      const profile = await Profile.create(data)

      const errors = await validate(profile)
      if (errors.length > 0) throw errors

      await profile.save()

      return res.status(201).json(profile)
    } catch (error) {
      res.status(500).json(error)
    }
  }

  async update(req: Request, res: Response) {
    try {
      const userId = req.body.user_id

      const user = await User.findOne(userId)

      const id = req.params.id

      const profile = await Profile.findOne(id)

      if (!profile) {
        res.status(404).json({ profile: 'Profile not found' })
        return
      }

      profile.name = req.body.name || profile.name
      profile.gender = req.body.gender || profile.gender
      profile.birthdate = req.body.birthdate || profile.birthdate
      profile.user = user || profile.user

      await profile.save()

      return res.json(profile)
    } catch (error) {
      res.status(500).json(error)
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const id = req.params.id

      const profile = await Profile.findOne(id)

      if (!profile) {
        res.status(404).json({ profile: 'Profile not found' })
        return
      }

      await profile.remove()

      return res.status(204)
    } catch (error) {
      res.status(500).json(error)
    }
  }
}

export const ProfileCtrl = new ProfileController()
