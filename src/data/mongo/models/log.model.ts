import { Schema, model } from 'mongoose'

const logSchema = new Schema({
  createdAt: {
    type: Date,
    default: new Date()
  },
  origin: {
    type: String,
    default: 'server',
  },
  level: {
    type: String,
    enum: [ 'low', 'medium', 'high' ],
    default: 'low'
  },
  message: {
    type: String,
    required: true,
  },
})

export const LogModel = model( 'Log', logSchema )
