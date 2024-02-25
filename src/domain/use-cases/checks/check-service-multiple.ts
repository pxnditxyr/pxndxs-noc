import { ELogSeverityLevel, LogEntity } from "../../entities"
import { LogRepository } from "../../repository"


interface ICheckServiceMultipleUseCase {
  execute( url : string ) : Promise<boolean>
}

type SuccessCallback = ( () => void ) | undefined
type ErrorCallback = ( ( error : string ) => void ) | undefined

export class CheckServiceMultiple implements ICheckServiceMultipleUseCase {
  constructor (
    private readonly logsRepository : LogRepository[],
    private readonly onSuccess : SuccessCallback,
    private readonly onError : ErrorCallback
  ) {}

  private callLogs = async ( log : LogEntity ) : Promise<void> => {
    this.logsRepository.forEach( async ( logRepository ) => {
      logRepository.saveLog( log )
    } )
  }

  public execute = async ( url : string ) : Promise<boolean> => {
    try {
      const req = await fetch( url )
      if ( !req.ok ) throw new Error( `Error on check service: ${ req.statusText } 🌐❌` )
      this.onSuccess && this.onSuccess()
      return true
    } catch ( error ) {
      const log = new LogEntity({
        message: `Error on check service: ${ error } 🌐❌`,
        level: ELogSeverityLevel.high,
        origin: 'check-service-multiple.ts'
      })
      this.callLogs( log )
      this.onError && this.onError( `${ error }` )
      return false
    }
  }
}
