import { State } from '../../entities/State'
import { IStatesRepositories } from '../../repositories/IStatesRepositories'

class FindStateService {
  constructor (private statesRepositories: IStatesRepositories) {}

  async execute (): Promise<State[]> {
    return await this.statesRepositories.findStates()
  }
}

export { FindStateService }
