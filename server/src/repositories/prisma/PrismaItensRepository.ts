import { prisma } from '@database/client'
import { Item } from '@entities/Item'
import { IItensRepositories } from '@repository/IItensRepositories'

class PrismaItensRepository implements IItensRepositories {
  async findById (id: number): Promise<Item> {
    try {
      const item = await prisma.item.findUnique({
        where: {
          id
        }
      })

      return item
    } finally {
      await prisma.$disconnect()
    }
  }

  async findAll (): Promise<Item[]> {
    try {
      const itens = await prisma.item.findMany()
      return itens
    } finally {
      await prisma.$disconnect()
    }
  }

  async saveAll (itens: Item[]): Promise<void> {
    try {
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
    } finally {
      await prisma.$disconnect()
    }
  }
}

export { PrismaItensRepository }
