import { State } from '../../entities/State'
import { IStatesRepositories } from '../IStatesRepositories'

class MokeStatesRepository implements IStatesRepositories {
  findStates ():  Promise<State[]> {
    return Promise.all([
      {
        name: 'Santa Catarina',
        cities: [
          {
            name: 'Laguna',
            uf: 'SC'
          }, {
            name: 'Tubarão',
            uf: 'SC'
          }
        ]
      }, {
        name: 'Rio Grande do Sul',
        cities: [
          {
            name: 'Porto Alegre',
            uf: 'RS'
          }, {
            name: 'Torres',
            uf: 'RS'
          }
        ]
      }, {
        name: 'Paraná',
        cities: [
          {
            name: 'Curitiba',
            uf: 'PR'
          }
        ]
      }, {
        name: 'São Paulo',
        cities: [
          {
            name: 'São Paulo',
            uf: 'SP'
          }
        ]
      }
    ])
  }
  }

export { MokeStatesRepository }
