import { Item } from '@entities/Item'

interface IItensRepositories {
  findById(id: number): Promise<Item>
  findAll(): Promise<Item[]>
  saveAll(itens: Item[]): Promise<void>
}

export { IItensRepositories }
