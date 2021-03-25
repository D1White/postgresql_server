import { Entity, Column, Unique, OneToMany } from 'typeorm'
import { IsEmail, Length } from 'class-validator'

import Model from './Model'
import { Profile } from './Profile'

@Entity()
@Unique(['username', 'email'])
export class User extends Model {
  @Column({ nullable: false })
  @Length(3, 20)
  username: string

  @Column({ nullable: false })
  @Length(3, 50)
  @IsEmail()
  email: string

  @Column({ nullable: false })
  @Length(3, 50)
  password: string

  @Column({ nullable: false })
  isAdmin: boolean

  @OneToMany(() => Profile, (profile) => profile.user)
  profiles: Profile[]

  toJSON(): User {
    return { ...this, password: undefined }
  }
}
