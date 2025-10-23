import User from '#models/user'
import { BaseSeeder } from '@adonisjs/lucid/seeders'
import { UserRole } from '#enums/user_role'

export default class extends BaseSeeder {
  async run() {
    await User.create({
      email: 'lehack192@gmail.com',
      password: 'test123456',
      role: UserRole.Moderator,
    })
  }
}
