import { PrismaItensRepository } from '@repository/prisma/PrismaItensRepository'
import { FindByIdItemService } from './FindByIdItemService'

const prismaItensRepository = new PrismaItensRepository()
const findByIdItemservice = new FindByIdItemService(prismaItensRepository)

export { findByIdItemservice }
