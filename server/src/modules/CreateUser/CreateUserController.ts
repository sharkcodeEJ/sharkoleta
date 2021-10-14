import { Request, Response } from 'express'
import { CreateUserService } from './CreateUserService'

class CreateUserController {
  constructor (private createUserService: CreateUserService) {}

  async handle (request: Request, response: Response): Promise<Response> {
    const { name, email } = request.body

    try {
      await this.createUserService.execute({
        name,
        email
      })

      return response.status(201).send()
    } catch (err) {
      return response.status(400).json({
        message: err.message || 'Unexpected error'
      })
    }
  }
}

export { CreateUserController }
