import { Item } from '@entities/Item'

interface IItensRepositories {
  findById(id: number): Promise<Item>
}

export { IItensRepositories }
