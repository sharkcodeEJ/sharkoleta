import { DataInitialConfig } from '@config/DataInitialConfig'
import { IItensRepositories } from '@repository/IItensRepositories'

class CreateDefaultItensService {
  constructor (private itensRepository: IItensRepositories) {}

  async execute () {
    const itens = DataInitialConfig.itensDefault()

    await this.itensRepository.saveAll(itens)
  }
}

export { CreateDefaultItensService }
