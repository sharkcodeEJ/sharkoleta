import { Item } from '@entities/Item'
import { Point } from '@entities/Point'
import { findByIdItemservice } from '@modules/FindByIdItem'
import { IPointsRepositories } from '@repository/IPointsRepositories'
import { ICreatePointResquestDTO, IItemCreatePointRequestDTO } from './CreatePointDTO'

class CreatePointService {
  constructor (private pointsRepository: IPointsRepositories) {}

  async execute ({ name, email, description, whatsapp, fone, latitude, longitude, city, uf, address, district, number, cep, image, itens }: ICreatePointResquestDTO) {
   
    const futureitens = itens.map(async (itemDto)=>{
        const item = await findByIdItemservice.execute(itemDto.id)
        return item;
    })

    const baseItens = await Promise.all(futureitens)
    const pointCreate = Point.create({ name, email, description, whatsapp, fone, latitude, longitude, city, uf, address, district, number, cep, image, itens: baseItens })
    await this.pointsRepository.save(pointCreate)
  }
}

export { CreatePointService }
