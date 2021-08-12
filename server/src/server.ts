import express, { NextFunction, Request, Response } from 'express'
import { routes } from './routes'

const PORT = process.env.PORT

const app = express()

app.use(express.json())

app.use(routes)

app.use(
  (err: Error, request: Request, respose: Response, next: NextFunction) => {
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
)

app.listen(PORT, () => console.log(`Server is running on port ${3333}`))
