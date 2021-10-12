import { Point } from '@entities/Point'
import { findByIdItemservice } from '@modules/FindByIdItem'
import { IPointsRepositories } from '@repository/IPointsRepositories'
import { ICreatePointResquestDTO, IItemCreatePointRequestDTO } from './CreatePointDTO'

class CreatePointService {
  constructor (private pointsRepository: IPointsRepositories) {}

  async execute ({ name, email, description, whatsapp, fone, latitude, longitude, city, uf, address, district, number, cep, image, itens }: ICreatePointResquestDTO) {
    const i: IItemCreatePointRequestDTO[] = []
    itens.map(item => findByIdItemservice.execute(item.id).then(x => i.push(x)))
    const pointCreate = Point.create({ name, email, description, whatsapp, fone, latitude, longitude, city, uf, address, district, number, cep, image, itens: i })
    await this.pointsRepository.save(pointCreate)
  }
}

export { CreatePointService }
