import { Router } from 'express'
import { createPointsController } from '@modules/CreatePoint'

const routes = Router()

routes.post('/points', (request, response) => {
  return createPointsController.handle(request, response)
})

export { routes }
