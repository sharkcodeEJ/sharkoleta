import { PrismaUsersRepository } from '@repository-impl/PrismaUsersRepository'
import { CreateUserController } from './CreateUserController'
import { CreateUserService } from './CreateUserService'

export const createUserFactory = () => {
  const prismaUsersRepository = new PrismaUsersRepository()
  const createUserService = new CreateUserService(prismaUsersRepository)
  const createUserController = new CreateUserController(createUserService)
  return createUserController
}
