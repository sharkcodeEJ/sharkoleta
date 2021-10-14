import { PrismaPointsRepository } from '@repository-impl/PrismaPointsRepository'
import { FilterPointsController } from './FilterPointsController'
import { FilterPointsService } from './FilterPointsService'

const prismaPointsRepository = new PrismaPointsRepository()
const filterPointsService = new FilterPointsService(prismaPointsRepository)
const filterPointsController = new FilterPointsController(filterPointsService)

export { filterPointsController }
