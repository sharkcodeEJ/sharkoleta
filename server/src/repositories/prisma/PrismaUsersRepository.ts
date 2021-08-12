import { IUsersRepositories } from '@repository/IUsersRepositories'
import { prisma } from '../../database/client'
import { User } from '@entities/User'

class PrismaUsersRepository implements IUsersRepositories {
  async findByEmail (email: string): Promise<User> {
    const user = await prisma.user.findUnique({
      where: {
        email
      }
    })

    return user
  }

  async save ({ name, email }: User): Promise<User> {
    const user = await prisma.user.create({
      data: {
        name,
        email
      }
    })

    return user
  }
}

export { PrismaUsersRepository }
