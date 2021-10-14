import { Point } from '@entities/Point'
import { IPointsRepositories } from '@repository/IPointsRepositories'

class FilterPointsService {
  constructor (private pointsRepositories: IPointsRepositories) {}

  async execute (uf: string, city: string, searchTerm: string): Promise<Point[]> {
    const points = await this.pointsRepositories.filter(uf, city, searchTerm)
    return points
  }
}

export { FilterPointsService }
