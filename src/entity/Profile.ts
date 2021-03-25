import { Entity, Column, ManyToOne } from 'typeorm'
import { IsEnum, Length, IsDateString } from 'class-validator'

import Model from './Model'
import { User } from './User'

@Entity()
export class Profile extends Model {
  @Column({ nullable: false })
  @Length(3, 30)
  name: string

  @Column({
    type: 'enum',
    enum: ['male', 'female'],
    nullable: false,
  })
  @IsEnum(['male', 'female', undefined])
  gender: string

  @Column({ nullable: false })
  @IsDateString()
  birthdate: string

  @Column({ nullable: false })
  @Length(2, 30)
  city: string

  @ManyToOne(() => User)
  user: User
}
