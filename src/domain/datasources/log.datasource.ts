import { ELogSeverityLevel, LogEntity } from '../'

export abstract class LogDatasource {
  abstract saveLog ( log : LogEntity ) : Promise<void>
  abstract getLogsByLevel ( severityLevel : ELogSeverityLevel ) : Promise<LogEntity[]>
  abstract getAllLogs () : Promise<LogEntity[]>
}
