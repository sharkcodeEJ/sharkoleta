import { Item } from '@entities/Item'
import { Point } from '@entities/Point'
import { findByIdItemservice } from '@modules/FindByIdItem'
import { IPointsRepositories } from '@repository/IPointsRepositories'
import { ICreatePointResquestDTO, IItemCreatePointRequestDTO } from './CreatePointDTO'

class CreatePointService {
  constructor (private pointsRepository: IPointsRepositories) {}

  async execute ({ name, email, description, whatsapp, fone, latitude, longitude, city, uf, address, district, number, cep, image, itens }: ICreatePointResquestDTO) {
    const i: Item[] = []
    await this.map(i, itens)
    const pointCreate = Point.create({ name, email, description, whatsapp, fone, latitude, longitude, city, uf, address, district, number, cep, image, itens: i })
    await this.pointsRepository.save(pointCreate)
  }

  async map (itens: Item[], itensDto: IItemCreatePointRequestDTO[]) {
    for (const itemDto of itensDto) {
      const item = await findByIdItemservice.execute(itemDto.id)
      itens.push(item)
    }
  }
}

export { CreatePointService }
