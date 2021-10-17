import { Request, Response } from 'express'
import { InitialConfigService } from './InitialConfigService'

class InitialConfigController {
  constructor (private initialConfigService: InitialConfigService) {}

  async handle (request: Request, response: Response): Promise<Response> {
    await this.initialConfigService.execute()
    return response.send()
  }
}

export { InitialConfigController }
