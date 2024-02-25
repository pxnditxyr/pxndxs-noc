import nodemailer from 'nodemailer'
import { envs } from '../../config'
import { ELogSeverityLevel, LogEntity } from '../../domain'


interface IAttachment {
  filename: string
  path: string
}

interface SendMailOptions {
  to: string | string[]
  subject: string
  htmlBody: string
  attachments?: IAttachment[]
} 

export class EmailService {

  constructor () {}

  private transporter = nodemailer.createTransport({
    service: envs.MAILER_SERVICE,
    auth: {
      user: envs.MAILER_EMAIL,
      pass: envs.MAILER_SECRET_KEY
    }
  })

  async sendEmail ( options : SendMailOptions ) : Promise<boolean> {
    const { to, subject, htmlBody, attachments = [] } = options

    try {
      const sentInformation = await this.transporter.sendMail({
        to,
        subject,
        html: htmlBody,
        attachments
      })
      console.log( sentInformation )
      return true
    } catch ( error ) {
      return false
    }
  }

  async sendEmailWithFileSystemLogs ( to: string | string[] ) {

    const subject = 'Sending Email with System Logs'
    const htmlBody = `
      <h1> Sending Email with System Logs </h1>
      <p> This is a test email </p>
    `
    const attachments : IAttachment[] = [
      { filename: 'logs-all.log', path: './logs/logs-all.log' },
      { filename: 'logs-low.log', path: './logs/logs-low.log' },
      { filename: 'logs-medium.log', path: './logs/logs-medium.log' },
      { filename: 'logs-high.log', path: './logs/logs-high.log' },
    ]
    return this.sendEmail({
      to,
      subject,
      htmlBody,
      attachments
    })

  }
  
}
