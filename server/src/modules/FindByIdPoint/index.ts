import { PrismaPointsRepository } from '@repository-impl/PrismaPointsRepository'
import { FindByIdPointController } from './FindByIdPointController'
import { FindByIdPointservice } from './FindByIdPointService'
import { findByIdPoitRequestParamsValidator } from './FindByIdPointDTO'

const prismaPointsRepository = new PrismaPointsRepository()
const findByIdPointService = new FindByIdPointservice(prismaPointsRepository)
const findByIdPointController = new FindByIdPointController(findByIdPointService)

export { findByIdPointService, findByIdPointController, findByIdPoitRequestParamsValidator }
