
interface ICheckServiceUseCase {
  execute( url : string ) : Promise<boolean>
}

type TSuccessCallback = () => void
type TErrorCallback = ( error : string ) => void

export class CheckService implements ICheckServiceUseCase {

  constructor (
    private readonly successCallback : TSuccessCallback,
    private readonly errorCallback : TErrorCallback
  ) {}

  async execute ( url : string ) : Promise<boolean> {
    try {
      const request = await fetch( url ) 
      if ( !request.ok ) throw new Error( `Error on Check Service ${ url }` )
      this.successCallback()
      return true
    } catch ( error ) {
      this.errorCallback( `${ error }` )
      return false
    }
  }
}
