import { Point } from '@entities/Point'
import { findByIdItemservice } from '@modules/FindByIdItem'
import { IPointsRepositories } from '@repository/IPointsRepositories'
import { ICreatePointResquestDTO } from './CreatePointDTO'

class CreatePointService {
  constructor (private pointsRepository: IPointsRepositories) {}

  async execute ({ name, email, description, whatsapp, fone, latitude, longitude, city, uf, address, district, number, cep, image, itensIds }: ICreatePointResquestDTO) {
    const futureItens = itensIds.map(async (item) => {
      return await findByIdItemservice.execute(item)
    })

    const baseItens = await Promise.all(futureItens)
    const pointCreate = Point.create({ name, email, description, whatsapp, fone, latitude, longitude, city, uf, address, district, number, cep, image, itens: baseItens })
    await this.pointsRepository.save(pointCreate)
  }
}

export { CreatePointService }
