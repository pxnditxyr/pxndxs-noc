import { CheckService } from '../domain'
import { CronService } from './cron'
import { FileSystemDatasource, LogRepositoryImpl } from '../infrastructure'

const fileSystemLogRepository = new LogRepositoryImpl(
  new FileSystemDatasource()
)

export class Server {
  public static start () {
    console.log( 'Pxndxs 🐼 Server started ⭐' )

    const url = 'http://localhost:3000/characters'

    const onSuccess = () => console.log( `Success: ${ url }` )
    const onError = ( error : string ) => console.log( `Error: ${ error }` )

    CronService.createJob(
      '*/5 * * * * *',
      () => {
        new CheckService(
          fileSystemLogRepository,
          onSuccess,
          onError
        ).execute( url )
      }
    )
  }
}
