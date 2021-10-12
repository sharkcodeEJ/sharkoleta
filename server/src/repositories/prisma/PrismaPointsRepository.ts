import { IPointsRepositories } from '@repository/IPointsRepositories'
import { prisma } from '@database/client'
import { Point } from '@entities/Point'

class PrismaPointsRepository implements IPointsRepositories {
  async save ({ id, name, email, description, whatsapp, fone, latitude, longitude, city, uf, address, district, number, cep, image, itens }: Point): Promise<void> {
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
          connect: itens
        }
      }
    })
  }
}

export { PrismaPointsRepository }
