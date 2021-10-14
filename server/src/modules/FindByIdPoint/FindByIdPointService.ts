import { Point } from '@entities/Point'
import { IPointsRepositories } from '@repository/IPointsRepositories'

class FindByIdPointservice {
  constructor (private pointsRepository: IPointsRepositories) {}

  async execute (id: string): Promise<Point> {
    const point = await this.pointsRepository.findById(id)
    return point
  }
}

export { FindByIdPointservice }
