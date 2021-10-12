import { Item } from '@entities/Item'
import { IItensRepositories } from '@repository/IItensRepositories'
class FindByIdItemService {
  constructor (private itensRepository: IItensRepositories) {}

  async execute (id: number): Promise<Item> {
    const item = await this.itensRepository.findById(id)

    if (item) {
      return item
    }

    throw new Error(`Item of id ${id} is not exist`)
  }
}

export { FindByIdItemService }
