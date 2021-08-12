import { User } from '@entities/User'
import { IUsersRepositories } from '@repository/IUsersRepositories'
import { ICreateUserResquestDTO } from './CreateUserDTO'

class CreateUserService {
  constructor (private usersRepository: IUsersRepositories) {}

  async execute ({ name, email }: ICreateUserResquestDTO) {
    const userAlreadyExists = await this.usersRepository.findByEmail(email)

    if (userAlreadyExists) {
      throw new Error('User already exists.')
    }

    const userCreate = User.create({ name, email })
    const user = await this.usersRepository.save(userCreate)

    return user
  }
}

export { CreateUserService }
