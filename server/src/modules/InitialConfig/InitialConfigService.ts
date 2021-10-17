import { CreateDefaultItensService } from '@modules/CreateDefaultItens/CreateDefaultItensService'

class InitialConfigService {
  constructor (private createDefaulteItensService: CreateDefaultItensService) {}

  async execute () {
    await this.createDefaulteItensService.execute()
  }
}

export { InitialConfigService }
