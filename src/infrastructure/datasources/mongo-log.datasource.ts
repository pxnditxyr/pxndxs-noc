import { LogModel } from '../../data'
import { ELogSeverityLevel, LogDatasource, LogEntity } from '../../domain'


export class MongoLogDatasource implements LogDatasource {
  async saveLog ( log : LogEntity ) : Promise<void> {
    const newLog = await LogModel.create( log )
    console.log( `Mongo Log Created with ID: ${ newLog._id }` )
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
