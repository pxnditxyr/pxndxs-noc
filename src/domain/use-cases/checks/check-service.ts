import { LogRepository, ELogSeverityLevel, LogEntity } from '../..'

interface ICheckServiceUseCase {
  execute( url : string ) : Promise<boolean>
}

type TSuccessCallback = ( () => void ) | undefined
type TErrorCallback = ( ( error : string ) => void ) | undefined

export class CheckService implements ICheckServiceUseCase {

  constructor (
    private readonly logRepository : LogRepository,
    private readonly successCallback : TSuccessCallback,
    private readonly errorCallback : TErrorCallback
  ) {}

  async execute ( url : string ) : Promise<boolean> {
    try {
      const request = await fetch( url ) 
      if ( !request.ok ) throw new Error( `Error on Check Service ${ url }` )
      this.successCallback && this.successCallback()
      return true
    } catch ( error ) {
      const errorMessage = `Error on Check Service ${ url }: ${ error }`
      const log = new LogEntity({
        message: errorMessage,
        level: ELogSeverityLevel.high,
        origin: 'check-service.ts'
      })
      this.logRepository.saveLog( log )
      this.errorCallback && this.errorCallback( errorMessage )
      return false
    }
  }
}
