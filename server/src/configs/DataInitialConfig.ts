import { Item } from '@entities/Item'

class DataInitialConfig {
  static itensDefault (): Item[] {
    const eletronicos = {
      id: 1,
      title: 'Elétronicos',
      image: 'elétronicos'
    } as Item

    const oleo = {
      id: 2,
      title: 'Óleo',
      image: 'óleo'
    } as Item

    return [eletronicos, oleo]
  }
}

export { DataInitialConfig }
