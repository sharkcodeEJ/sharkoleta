import { Response, Request } from 'express'
import { FindByIdPointservice } from './FindByIdPointService'

class FindByIdPointController {
  constructor (private findByIdPointService: FindByIdPointservice) {}

  async handle (request: Request, response: Response): Promise<Response> {
    const { id } = request.params
    const point = await this.findByIdPointService.execute(id)
    return response.json(point)
  }
}

export { FindByIdPointController }
