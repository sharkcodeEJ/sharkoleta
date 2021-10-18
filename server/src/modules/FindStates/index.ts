import { MokeStatesRepository } from '@repository-moke/MokeStatesRepository'
import { FindStateController } from './FindStateController'
import { FindStateService } from './FindStatesService'

const makeStateRepository = new MokeStatesRepository()
const findStateService = new FindStateService(makeStateRepository)
const findStateController = new FindStateController(findStateService)

export { findStateController }
