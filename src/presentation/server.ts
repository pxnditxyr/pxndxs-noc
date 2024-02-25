import { CheckService, ELogSeverityLevel, LogRepository, SendEmailLogs } from '../domain'
import { CronService } from './cron'
import { FileSystemDatasource, LogRepositoryImpl, MongoLogDatasource } from '../infrastructure'
import { EmailService } from './email'

const fileSystemLogRepository = new LogRepositoryImpl(
  new FileSystemDatasource()
)

const logRepository = new LogRepositoryImpl(
  new FileSystemDatasource()
)

const emailService = new EmailService()

export class Server {
  static start = async () => {
    console.log( 'Pxndxs 🐼 Server started ⭐' )

    // new SendEmailLogs(
    //   emailService,
    //   fileSystemLogRepository
    // ).execute([
    //   'jricaldij@est.emi.edu.bo',
    // ])

    // emailService.sendEmailWithFileSystemLogs([
    //   // 'jiquispech@est.emi.edu.bo',
    //   'jricaldij@est.emi.edu.bo'
    // ])

    // const url = 'http://localhost:3000/characters'
    //
    // const onSuccess = () => console.log( `${ url } is up 🚀` )
    // const onError = ( error : string ) => console.log( `${ url } is down ❌`, error )
    //
    // CronService.createJob(
    //   '*/5 * * * * *',
    //   () => {
    //     new CheckService(
    //       logRepository,
    //       onSuccess,
    //       onError
    //     ).execute( url )
    //   }
    // )
    const logs = await logRepository.getLogsByLevel( ELogSeverityLevel.high )
    console.log( logs )
  }
}
