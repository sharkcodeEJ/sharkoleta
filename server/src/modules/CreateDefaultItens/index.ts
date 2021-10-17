import { PrismaItensRepository } from '@repository/prisma/PrismaItensRepository'
import { CreateDefaultItensService } from './CreateDefaultItensService'

const prismaItensRepository = new PrismaItensRepository()
const createDefaultItensService = new CreateDefaultItensService(prismaItensRepository)

export { createDefaultItensService }
