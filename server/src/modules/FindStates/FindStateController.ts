import { Response, Request } from 'express'
import { FindStateService } from './FindStatesService'

class FindStateController {
  constructor (private findStateService: FindStateService) {}

  handle (request: Request, response: Response): Response {
    const states = this.findStateService.execute()
    return response.json(states)
  }
}

export { FindStateController }
