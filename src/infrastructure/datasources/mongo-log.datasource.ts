import { LogModel } from '../../data'
import { ELogSeverityLevel, LogDatasource, LogEntity } from '../../domain'


export class MongoLogDatasource implements LogDatasource {
  async saveLog ( log : LogEntity ) : Promise<void> {
    await LogModel.create( log )
  }
  async getLogsByLevel ( severityLevel : ELogSeverityLevel ) : Promise<LogEntity[]> {
    const logs = await LogModel.find({
      level: severityLevel
    })
    return logs.map( LogEntity.fromObject )
  }
  async getAllLogs () : Promise<LogEntity[]> {
    const logs = await LogModel.find()
    return logs.map( LogEntity.fromObject )
  }
}
