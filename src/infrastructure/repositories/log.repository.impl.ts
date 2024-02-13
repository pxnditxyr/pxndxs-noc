import { ELogSeverityLevel, LogDatasource, LogEntity, LogRepository } from '../../domain'

export class LogRepositoryImpl implements LogRepository {

  constructor (
    private readonly logDatasource : LogDatasource
  ) {}

  async saveLog ( log : LogEntity ) : Promise<void> {
    return this.logDatasource.saveLog( log )
  }

  async getLogsByLevel ( severityLevel : ELogSeverityLevel ) : Promise<LogEntity[]> {
    return this.logDatasource.getLogsByLevel( severityLevel )
  }

  async getAllLogs () : Promise<LogEntity[]> {
    return this.logDatasource.getAllLogs()
  }
}
