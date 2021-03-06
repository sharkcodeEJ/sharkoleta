import { Request, Response } from 'express'
import { CreatePointService } from './CreatePointService'

class CreatePointController {
  constructor (private createUserService: CreatePointService) {}

  async handle (request: Request, response: Response): Promise<Response> {
    const { name, email, description, whatsapp, fone, latitude, longitude, city, uf, address, district, number, image, cep, itens } = request.body
    try {
      await this.createUserService.execute({
        name,
        email,
        description,
        whatsapp,
        fone,
        latitude,
        longitude,
        city,
        uf,
        address,
        district,
        number,
        cep,
        image,
        itens
      })

      return response.status(201).send()
    } catch (err) {
      return response.status(400).json({
        message: err.message || 'Unexpected error'
      })
    }
  }
}

export { CreatePointController }
