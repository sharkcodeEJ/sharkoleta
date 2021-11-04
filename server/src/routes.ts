import { Router } from 'express'
import { checkSchema, validationResult } from 'express-validator'
import { createPointsController, createPoitRequestBodyValidator } from '@modules/CreatePoint'
import { findByIdPointController, findByIdPoitRequestParamsValidator } from '@modules/FindByIdPoint'
import { filterPointsController } from '@modules/FilterPoints'
import { findStateController } from '@modules/FindStates'
import { initialConfigController } from '@modules/InitialConfig'

const routes = Router()

routes.post('/config', (request, response) => {
  return initialConfigController.handle(request, response)
})

routes.post(
  '/points',
  checkSchema(createPoitRequestBodyValidator),
  (request, response) => {
    const errors = validationResult(request)
    if (!errors.isEmpty()) {
      return response.status(400).json({ errors: errors.array() })
    }
    return createPointsController.handle(request, response)
  }
)

routes.get('/points', (request, response) => {
  return filterPointsController.handle(request, response)
})

routes.get('/points/:id',
  checkSchema(findByIdPoitRequestParamsValidator),
  (request, response) => {
    const errors = validationResult(request)
    if (!errors.isEmpty()) {
      return response.status(400).json({ errors: errors.array() })
    }
    return findByIdPointController.handle(request, response)
  }
)

routes.get('/states', (request, response) => {
  return findStateController.handle(request, response)
})

export { routes }
