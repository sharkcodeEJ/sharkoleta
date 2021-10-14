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
}

export { PrismaItensRepository }
