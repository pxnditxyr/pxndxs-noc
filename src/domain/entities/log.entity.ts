
export enum ELogSeverityLevel {
  low = 'low',
  medium = 'medium',
  high = 'high',
}


export class LogEntity {
  public level : ELogSeverityLevel
  public message : string
  public createdAt : Date

  constructor (
    message : string,
    level : ELogSeverityLevel,
  ) {
    this.message = message
    this.level = level
    this.createdAt = new Date()
  }

  static fromJson = ( json : string ) : LogEntity => {
    const { message, level, createdAt } = JSON.parse( json )
    if ( !message ) throw new Error( 'Message is required' )
    if ( !level ) throw new Error( 'Level is required' )
    if ( !createdAt ) throw new Error( 'CreatedAt is required' )
    
    const log = new LogEntity( message, level )
    log.createdAt = new Date( createdAt )

    return log
  }

}
