import { PrismaStatesRepositories } from '@repository/prisma/PrismaStatesRepository'
import { FindStateController } from './FindStateController'
import { FindStateService } from './FindStatesService'

const makeStateRepository = new PrismaStatesRepositories()
const findStateService = new FindStateService(makeStateRepository)
const findStateController = new FindStateController(findStateService)

export { findStateController }
