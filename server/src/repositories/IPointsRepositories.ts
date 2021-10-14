import { Point } from '@entities/Point'

interface IPointsRepositories {
    save(user: Point): Promise<void>
    findById(id: string): Promise<Point>
    filter(uf: string, city: string, searchTerm: string): Promise<Point[]>
}

export { IPointsRepositories }
