import { FileSystemDatasource, LogRepositoryImpl, MongoLogDatasource, PostgresLogDatasource } from '../infrastructure'
import { CheckServiceMultiple } from '../domain'
import { CronService } from './cron'

const fileSystemLogRepository = new LogRepositoryImpl(
  new FileSystemDatasource()
)

const mongoLogRepository = new LogRepositoryImpl(
  new MongoLogDatasource()
)

const postgresLogRepository = new LogRepositoryImpl( 
  new PostgresLogDatasource()
)


// const emailService = new EmailService()

export class Server {
  static start = async () => {
    console.log( 'Pxndxs 🐼 Server started ⭐' )

    // new SendEmailLogs(
    //   emailService,
    //   fileSystemLogRepository
    // ).execute([
    //   'pxndxs@pxndxs.com'
    // ])

    // emailService.sendEmailWithFileSystemLogs([
    //   'pxndxs@pxndxs.com'
    // ])

    const url = 'http://localhost:3000/characters'

    const onSuccess = () => console.log( `${ url } is up 🚀` )
    const onError = ( error : string ) => console.log( `${ url } is down ❌`, error )

    CronService.createJob(
      '*/5 * * * * *',
      () => {
        new CheckServiceMultiple(
          [
            fileSystemLogRepository,
            mongoLogRepository,
            postgresLogRepository
          ],
          onSuccess,
          onError
        ).execute( url )
      }
    )
  }
}
