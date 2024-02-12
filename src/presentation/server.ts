import { CheckService } from '../domain'
import { CronService } from './cron'

export class Server {
  public static start () {
    console.log( 'Pxndxs 🐼 Server started ⭐' )

    const url = 'https://www.google.com'

    const onSuccess = () => console.log( `Success: ${ url }` )
    const onError = ( error : string ) => console.log( `Error: ${ error }` )

    CronService.createJob(
      '*/5 * * * * *',
      () => {
        new CheckService(
          onSuccess,
          onError
        ).execute( url )
      }
    )
  }
}
