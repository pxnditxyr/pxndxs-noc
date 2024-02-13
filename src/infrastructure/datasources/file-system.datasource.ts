import fs from 'fs'
import { ELogSeverityLevel, LogDatasource, LogEntity } from '../../domain'

export class FileSystemDatasource implements LogDatasource {

  private readonly logPath        = 'logs/'
  private readonly allLogsPath    = 'logs/logs-all.log'
  private readonly lowLogsPath    = 'logs/logs-low.log'
  private readonly mediumLogsPath = 'logs/logs-medium.log'
  private readonly highLogsPath   = 'logs/logs-high.log'

  constructor () {
    this.createLogFiles()
  }

  private createLogFiles = () => {
    if ( !fs.existsSync( this.logPath ) ) {
      fs.mkdirSync( this.logPath )
    }
    
    [
      this.allLogsPath,
      this.lowLogsPath,
      this.mediumLogsPath,
      this.highLogsPath
    ].forEach( path => {
      if ( fs.existsSync( path ) ) return
      fs.writeFileSync( path, '' )
    } )
  }


  async saveLog ( newLog : LogEntity ) : Promise<void> {
    const logJson = JSON.stringify( newLog )
    fs.appendFileSync( this.allLogsPath, `${ logJson }\n` )
    if ( newLog.level === ELogSeverityLevel.low ) {
      fs.appendFileSync( this.lowLogsPath, `${ logJson }\n` )
      return
    }
    if ( newLog.level === ELogSeverityLevel.medium ) {
      fs.appendFileSync( this.mediumLogsPath, `${ logJson }\n` )
      return
    }
    if ( newLog.level === ELogSeverityLevel.high ) {
      fs.appendFileSync( this.highLogsPath, `${ logJson }\n` )
      return
    }
    return
  }

  private getLogsFromFile = ( path : string ) : LogEntity[] => {
    const content = fs.readFileSync( path, 'utf-8' )
    const logs = content.split( '\n' ).map( LogEntity.fromJson )
    return logs
  }

  async getLogsByLevel ( severityLevel : ELogSeverityLevel ) : Promise<LogEntity[]> {
    switch ( severityLevel ) {
      case ELogSeverityLevel.low:
        return this.getLogsFromFile( this.lowLogsPath )
      case ELogSeverityLevel.medium:
        return this.getLogsFromFile( this.mediumLogsPath )
      case ELogSeverityLevel.high:
        return this.getLogsFromFile( this.highLogsPath )
      default:
        throw new Error( `${ severityLevel } is not a valid severity level` )
    }
  }
  async getAllLogs () : Promise<LogEntity[]> {
    return this.getLogsFromFile( this.allLogsPath )
  }
  
}
