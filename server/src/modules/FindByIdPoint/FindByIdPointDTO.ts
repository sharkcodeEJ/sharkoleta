import { Schema } from 'express-validator'

const findByIdPoitRequestParamsValidator = {
  id: {
    in: ['params'],
    errorMessage: 'id is UUID',
    isUUID: true
  }
} as Schema

export { findByIdPoitRequestParamsValidator }
