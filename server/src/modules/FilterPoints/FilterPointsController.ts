import { Request, Response } from 'express'
import { FilterPointsService } from './FilterPointsService'
class FilterPointsController {
  constructor (private filterPointsService: FilterPointsService) {}

  async handle (request: Request, response: Response): Promise<Response> {
    const { uf, city, searchterm } = request.query

    const points = await this.filterPointsService.execute(uf, city, searchterm)
    return response.json(points)
  }
}

export { FilterPointsController }
