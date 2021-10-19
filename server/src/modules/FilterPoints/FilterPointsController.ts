import { Request, Response } from 'express'
import { FilterPointsService } from './FilterPointsService'

class FilterPointsController {
  constructor (private filterPointsService: FilterPointsService) {}

  async handle (request: Request, response: Response): Promise<Response> {
    const { uf, city, searchTerm } = request.query

    const points = await this.filterPointsService.execute(String(uf), String(city), String(searchTerm))
    return response.json(points)
  }
}

export { FilterPointsController }
