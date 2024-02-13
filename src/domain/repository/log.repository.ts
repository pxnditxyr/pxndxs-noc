import { ELogSeverityLevel, LogEntity } from '../'


export abstract class LogRepository {
  abstract saveLog ( log : LogEntity ) : Promise<void>
  abstract getLogsByLevel ( severityLevel : ELogSeverityLevel ) : Promise<LogEntity[]>
  abstract getAllLogs () : Promise<LogEntity[]>
}
