import { Request, Response } from 'express'
import { FilterPointsService } from './FilterPointsService'

class FilterPointsController {
  constructor (private filterPointsService: FilterPointsService) {}

  async handle (request: Request, response: Response): Promise<Response> {
    const uf = request.query.uf
    const city = request.query.city
    const searchTerm = request.query.searchterm

    let points = await this.filterPointsService.execute(uf, city, searchTerm)
    points = points.map(point => {
      return { ...point, itens: point.itens.map(item => item.item) }
    })
    return response.json(points)
  }
}

export { FilterPointsController }
