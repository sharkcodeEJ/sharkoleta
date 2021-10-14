import { IPointsRepositories } from '@repository/IPointsRepositories'
import { prisma } from '@database/client'
import { Point } from '@entities/Point'

class PrismaPointsRepository implements IPointsRepositories {
  async save ({ id, name, email, description, whatsapp, fone, latitude, longitude, city, uf, address, district, number, cep, image, itens }: Point): Promise<void> {
    const itensId = itens.map(item => {
      return { itemId: item.id }
    })
    await prisma.point.create({
      data: {
        id,
        name,
        email,
        description,
        whatsapp,
        fone,
        latitude,
        longitude,
        city,
        uf,
        address,
        district,
        number,
        image,
        cep,
        itens: {
          createMany: {
            data: itensId,
            skipDuplicates: true
          }
        }
      }
    })
  }

  async findById (id: string): Promise<Point> {
    const point = await prisma.point.findUnique({
      where: {
        id
      },
      include: {
        itens: {
          include: {
            item: true
          }
        }
      }
    })

    return point
  }

  async filter (uf?: string, city?: string, searchTerm?: string): Promise<Point[]> {
    const points = await prisma.point.findMany({
      where: {
        uf,
        city,
        description: {
          contains: searchTerm
        }
      },
      include: {
        itens: {
          include: {
            item: true
          }
        }
      }
    })
    return points
  }
}

export { PrismaPointsRepository }
