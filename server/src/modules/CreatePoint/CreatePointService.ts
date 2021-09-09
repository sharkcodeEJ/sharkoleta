import { Point } from '@entities/Point'
import { IPointsRepositories } from '@repository/IPointsRepositories'
import { ICreatePointResquestDTO } from './CreatePointDTO'

class CreatePointService {
  constructor (private usersRepository: IPointsRepositories) {}

  async execute ({ name, email, description, whatsapp, fone, latitude, longitude, city, uf, address, district, number, cep, image, itens }: ICreatePointResquestDTO) {
    const pointCreate = Point.create({ name, email, description, whatsapp, fone, latitude, longitude, city, uf, address, district, number, cep, image, itens })
    await this.usersRepository.save(pointCreate)
  }
}

export { CreatePointService }
