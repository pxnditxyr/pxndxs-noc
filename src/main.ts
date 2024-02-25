import { envs } from './config'
import { MongoDatabase } from './data'
import { Server } from './presentation'

( async () => {
  main()
} )()

async function main () {
  await MongoDatabase.connect({
    mongoURI: envs.MONGO_URI,
    dbName: envs.MONGO_DB
  })
  Server.start()
}


