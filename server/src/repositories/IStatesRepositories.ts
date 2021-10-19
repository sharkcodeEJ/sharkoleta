import { State } from '../entities/State'

interface IStatesRepositories {
  findStates():  Promise<State[]>
}

export { IStatesRepositories }
