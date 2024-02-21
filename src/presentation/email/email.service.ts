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
        <!DOCTYPE html>
        <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <meta http-equiv="X-UA-Compatible" content="ie=edge">
                <title> example.html </title>
                <style>
                    .container {
    width: 300px;
    height: 200px;
    background-color: #1B4242;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: white;
    border-radius: 20px;
}

.container p {
    text-wrap: pretty;
    width: 100%;
    text-align: center;
}

                </style>
            </head>
            <body>
                <article class="container">
    <h1> Coffy Code </h1>
    <p> Este es el codigo de verificacion 857689</p>
</article>
                <script>
                    
                </script>
            </body>
        </html>
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
