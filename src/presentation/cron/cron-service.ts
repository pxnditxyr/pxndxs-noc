import { CronJob } from 'cron'

type TCronTime = string | Date
type TOnTick = () => void

export class CronService {
  static createJob = ( cronTime : TCronTime, onTick : TOnTick ) : CronJob => {
    const job = new CronJob( cronTime, onTick )
    job.start()
    return job
  }
}
