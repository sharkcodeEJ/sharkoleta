import { prisma } from '@database/client'
import { State } from '@entities/State'
import { IStatesRepositories } from '@repository/IStatesRepositories'

class PrismaStatesRepositories implements IStatesRepositories {

  async findStates (): Promise<State[]> {
    try {
      const states = await prisma.point.findMany({
            select : {
                uf : true,
            },
            distinct : [ "uf"],
        })
      console.log(states)
     const regions  = states.map(async (state)=>{
        return {
            name : state.uf,
            cities : (await prisma.point.findMany({
                select : {
                    city : true,
                    uf : true,
                },
                distinct : [ "city"],
                where: {
                    uf: state.uf,
                }
            })).map((city)=> ({
                name : city.city,
                uf : city.uf,
            }))
        } 
     })
     console.log(regions)

     return Promise.all(regions);


    } finally {
      await prisma.$disconnect()
    }
  }
  
}

export { PrismaStatesRepositories }
