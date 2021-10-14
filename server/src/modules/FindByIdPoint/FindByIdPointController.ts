import { Response, Request } from 'express'
import { FindByIdPointservice } from './FindByIdPointService'

class FindByIdPointController {
  constructor (private findByIdPointService: FindByIdPointservice) {}

  async handle (request: Request, response: Response): Promise<Response> {
    const id = request.params.id
    const point = await this.findByIdPointService.execute(id)
    return response.json({ ...point, itens: point.itens.map(item => item.item) })
  }
}

export { FindByIdPointController }
