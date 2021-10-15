import { State } from '../../entities/State'
import { IStatesRepositories } from '../../repositories/IStatesRepositories'

class FindStateService {
  constructor (private statesRepositories: IStatesRepositories) {}

  execute (): State[] {
    return this.statesRepositories.findStates()
  }
}

export { FindStateService }
