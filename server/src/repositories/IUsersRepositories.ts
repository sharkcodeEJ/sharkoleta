import { User } from '@entities/User'

interface IUsersRepositories {
    findByEmail(email: string): Promise<User>
    save(user: User): Promise<User>
}

export { IUsersRepositories }
