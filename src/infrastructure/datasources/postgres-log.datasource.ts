import { PrismaClient, SeverityLevel } from '@prisma/client'
import { ELogSeverityLevel, LogDatasource, LogEntity } from '../../domain'

const prisma = new PrismaClient()

const severityLevelEnum = {
  low: SeverityLevel.LOW,
  medium: SeverityLevel.MEDIUM,
  high: SeverityLevel.HIGH
}

export class PostgresLogDatasource implements LogDatasource {


  async saveLog ( log : LogEntity ) : Promise<void> {
    const level = severityLevelEnum[ log.level ]
    try {
      await prisma.logModel.create({
        data: {
          ...log,
          level
        }
      })
    } catch ( error ) {
      console.error( error )
      throw new Error( 'Error saving log' )
    }
  }
  async getLogsByLevel ( severityLevel : ELogSeverityLevel ) : Promise<LogEntity[]> {
    const level = severityLevelEnum[ severityLevel ]
    const logs = await prisma.logModel.findMany({
      where: { level }
    })
    return logs.map( LogEntity.fromObject )
  }
  async getAllLogs () : Promise<LogEntity[]> {
    const logs = await prisma.logModel.findMany()
    return logs.map( LogEntity.fromObject )
  }
}
