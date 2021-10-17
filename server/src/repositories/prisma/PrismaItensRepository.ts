import { prisma } from '@database/client'
import { Item } from '@entities/Item'
import { IItensRepositories } from '@repository/IItensRepositories'

class PrismaItensRepository implements IItensRepositories {
  async findById (id: number): Promise<Item> {
    const item = await prisma.item.findUnique({
      where: {
        id
      }
    })

    return item
  }

  async findAll (): Promise<Item[]> {
    const itens = await prisma.item.findMany()
    return itens
  }

  async saveAll (itens: Item[]): Promise<void> {
    for (const item of itens) {
      await prisma.item.upsert({
        create: item,
        update: {
          title: item.title,
          image: item.image
        },
        where: {
          id: item.id
        }
      })
    }
  }
}

export { PrismaItensRepository }
