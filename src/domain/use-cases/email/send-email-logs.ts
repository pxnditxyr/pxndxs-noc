import { EmailService } from '../../../presentation'
import { ELogSeverityLevel, LogEntity } from '../../entities'
import { LogRepository } from '../../repository'

interface ISendLogEmailUseCase {
  execute: ( to : string | string[] ) => Promise<boolean>
}

export class SendEmailLogs implements ISendLogEmailUseCase {

  constructor (
    private readonly emailService : EmailService,
    private readonly logRepository : LogRepository
  ) {}
  async execute ( to : string | string[] ) {
    try {
      const sent = await this.emailService.sendEmailWithFileSystemLogs( to )
      if ( !sent ) throw new Error( `Error sending email to ${ to }` )
      return true
    } catch ( error ) {
      
      const log = new LogEntity({
        level: ELogSeverityLevel.high,
        origin: 'SendEmailLogs',
        message: `${ error }`,
      })

      this.logRepository.saveLog( log )
      return false
    }
  }
}
