import { Response, Request } from 'express'
import { FindStateService } from './FindStatesService'

class FindStateController {
  constructor (private findStateService: FindStateService) {}

  async handle (request: Request, response: Response): Promise<Response> {
    const states = await this.findStateService.execute()
    return response.json(states)
  }
}

export { FindStateController }
