import { State } from '../entities/State'

interface IStatesRepositories {
  findStates(): State[]
}

export { IStatesRepositories }
