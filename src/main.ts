import { envs } from './config'
import { LogModel, MongoDatabase } from './data'
import { Server } from './presentation'

( async () => {
  main()
} )()

async function main () {
  await MongoDatabase.connect({
    mongoURI: envs.MONGO_URI,
    dbName: envs.MONGO_DB
  })

  // const newLog = await LogModel.create({
  //   message: 'Server started 🚀',
  //   level: 'low',
  //   origin: 'main.ts',
  // })
  //
  // await newLog.save()
  // console.log( 'Log created 📝', newLog )
  //
  Server.start()
}


