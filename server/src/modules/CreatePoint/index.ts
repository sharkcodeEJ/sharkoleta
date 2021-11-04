import { PrismaPointsRepository } from '@repository-impl/PrismaPointsRepository'
import { CreatePointController } from './CreatePointController'
import { CreatePointService } from './CreatePointService'
import { createPoitRequestBodyValidator } from './CreatePointDTO'

const prismaPointsRepository = new PrismaPointsRepository()
const createPointsService = new CreatePointService(prismaPointsRepository)
const createPointsController = new CreatePointController(createPointsService)

export { createPointsController, createPointsService, createPoitRequestBodyValidator }
