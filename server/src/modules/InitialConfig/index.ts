import { InitialConfigController } from './InitialConfigController'
import { InitialConfigService } from './InitialConfigService'
import { createDefaultItensService } from '@modules/CreateDefaultItens'

const initialConfigService = new InitialConfigService(createDefaultItensService)
const initialConfigController = new InitialConfigController(initialConfigService)

export { initialConfigController }
