import { Point } from '@entities/Point'

interface IPointsRepositories {
    save(user: Point): Promise<void>
}

export { IPointsRepositories }
