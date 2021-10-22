import express, { NextFunction, Request, Response } from 'express'
import { routes } from './routes'
import cors from 'cors'

const app = express()

const messageError = (err: Error, request: Request, respose: Response, next: NextFunction) => {
  if (err instanceof Error) {
    return respose.status(400).json({
      message: err.message
    })
  }
  return respose.status(500).json({
    status: 'error',
    message: `Internal server error - ${err}`
  })
}

app.use(express.json())

app.use(routes)

app.use(cors())

app.use(messageError)

export { app }
