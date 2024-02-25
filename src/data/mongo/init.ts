import mongoose from 'mongoose'

interface IConnectionOptions {
  mongoURI: string
  dbName: string

}

export class MongoDatabase {
  static connect = async ( options : IConnectionOptions ) => {
    const { mongoURI, dbName } = options
    try {
      await mongoose.connect( mongoURI, {
        dbName
      })
      console.log( 'Connected to MongoDB 🥦' )
    } catch ( error ) {
      console.error( error )
      throw new Error( 'Error connecting to MongoDB 🥬' )
    }
  }
}
