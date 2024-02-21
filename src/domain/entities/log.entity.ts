
export enum ELogSeverityLevel {
  low = 'low',
  medium = 'medium',
  high = 'high',
}

export interface ILogEntityOptions {
  createdAt?: Date
  level: ELogSeverityLevel
  message: string
  origin: string
}


export class LogEntity {
  public createdAt : Date
  public level : ELogSeverityLevel
  public message : string
  public origin : string

  constructor ( {
    createdAt = new Date(),
    level,
    message,
    origin
  } : ILogEntityOptions ) {
    this.createdAt = createdAt
    this.level = level
    this.message = message
    this.origin = origin
  }

  static fromJson = ( json : string ) : LogEntity => {
    const { message, level, createdAt, origin } = JSON.parse( json )
    if ( !message ) throw new Error( 'Message is required' )
    if ( !level ) throw new Error( 'Level is required' )
    if ( !createdAt ) throw new Error( 'CreatedAt is required' )
    
    const log = new LogEntity({
      createdAt,
      level,
      message,
      origin
    })
    log.createdAt = new Date( createdAt )

    return log
  }

}
