'use strict'

const mongoose = require('mongoose')

const Schema = mongoose.Schema

const schema = new Schema(
  {
    nftCharacterId : { type: String, required: true },
    query          : { type: String, required: true },
    response       : { type: String, required: true },
    sessionId      : { type: String },
    createdBy      : { type: String, required: true },
  },
  { timestamps: true }
)

schema.index({ nftCharacterId: 1 })
schema.index({ sessionId: 1 })
schema.index({ createdBy: 1 })

mongoose.model('Conversation', schema)

module.exports = mongoose.model('Conversation')
