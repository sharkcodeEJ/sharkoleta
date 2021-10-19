import { IPointsRepositories } from '@repository/IPointsRepositories'
import { prisma } from '@database/client'
import { Point } from '@entities/Point'

class PrismaPointsRepository implements IPointsRepositories {
  async save ({ id, name, email, description, whatsapp, fone, latitude, longitude, city, uf, address, district, number, cep, image, itens }: Point): Promise<void> {
    const itensId = itens.map(item => {
      return { itemId: item.id }
    })

    try {
      await prisma.point.upsert({
        create: {
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
        },
        update: {
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
            deleteMany: {
              pointId: id
            },
            createMany: {
              data: itensId,
              skipDuplicates: true
            }
          }
        },
        where: {
          id
        }
      })
    } finally {
      await prisma.$disconnect()
    }
  }

  async findById (id: string): Promise<Point> {
    try {
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
      return {
        ...point,
        latitude: Number(point.latitude),
        longitude: Number(point.longitude),
        itens: point.itens.map(item => item.item)
      }
    } finally {
      await prisma.$disconnect()
    }
  }

  async filter (uf?: string, city?: string, searchTerm?: string): Promise<Point[]> {
    let where = {
      uf,
      city
    }

    if (searchTerm) {
      const customSearch = {
        OR: [
          {
            name: {
              contains: searchTerm,
              mode: 'insensitive'
            }
          },
          {
            description: {
              contains: searchTerm,
              mode: 'insensitive'
            }
          }
        ]
      }
      where = Object.assign(where, customSearch)
    }

    try {
      const points = await prisma.point.findMany({
        where: where,
        include: {
          itens: {
            include: {
              item: true
            }
          }
        }
      })
      return points.map(point => {
        return {
          ...point,
          latitude: Number(point.latitude),
          longitude: Number(point.longitude),
          itens: point.itens.map(item => item.item)
        }
      })
    } finally {
      await prisma.$disconnect()
    }
  }
}

export { PrismaPointsRepository }
