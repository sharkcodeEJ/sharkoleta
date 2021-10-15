import { Router } from 'express'
import { createPointsController } from '@modules/CreatePoint'
import { findByIdPointController } from '@modules/FindByIdPoint'
import { filterPointsController } from '@modules/FilterPoints'
import { findStateController } from '@modules/FindStates'

const routes = Router()

routes.post('/points', (request, response) => {
  return createPointsController.handle(request, response)
})

routes.get('/points/:id', (request, response) => {
  return findByIdPointController.handle(request, response)
})

routes.get('/points', (request, response) => {
  return filterPointsController.handle(request, response)
})

routes.get('/states', (request, response) => {
  return findStateController.handle(request, response)
})

export { routes }
