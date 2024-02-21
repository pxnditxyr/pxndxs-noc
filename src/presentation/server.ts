import { CheckService, LogRepository } from '../domain'
import { CronService } from './cron'
import { FileSystemDatasource, LogRepositoryImpl } from '../infrastructure'
import { EmailService } from './email'
import { SendEmailLogs } from '../domain/use-cases/email'

const fileSystemLogRepository = new LogRepositoryImpl(
  new FileSystemDatasource()
)

const emailService = new EmailService()

export class Server {
  public static start () {
    console.log( 'Pxndxs 🐼 Server started ⭐' )

    // new SendEmailLogs(
    //   emailService,
    //   fileSystemLogRepository
    // ).execute([
    //   'jricaldij@est.emi.edu.bo',
    //   'marlene.totoro.11@gmail.com'
    // ])

    // emailService.sendEmailWithFileSystemLogs([
    //   // 'jiquispech@est.emi.edu.bo',
    //   'jricaldij@est.emi.edu.bo'
    // ])

    // const url = 'http://localhost:3000/characters'

    // const onSuccess = () => console.log( `Success: ${ url }` )
    // const onError = ( error : string ) => console.log( `Error: ${ error }` )

    // CronService.createJob(
    //   '*/5 * * * * *',
    //   () => {
    //     new CheckService(
    //       fileSystemLogRepository,
    //       onSuccess,
    //       onError
    //     ).execute( url )
    //   }
    // )
  }
}
