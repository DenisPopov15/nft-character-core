'use strict'

const mongoose = require('mongoose')

const Schema = mongoose.Schema

const QUEST_TYPES = ['quiz']

const QUEST_STATES = ['pending', 'inPorgress', 'completed', 'declined']

const schema = new Schema(
  {
    nftCharacterId  : { type: String, required: true },
    questTemplateId : { type: String, required: true },
    title           : { type: String },
    description     : { type: String },
    tasks           : { type: Array, default: [] },
    accomplishments : { type: Array, default: [] },
    progressDetails : { type: String },
    sessionId       : { type: String },
    type            : { type: String, required: true, enum: QUEST_TYPES },
    state           : { type: String, required: true, enum: QUEST_STATES },
    createdBy       : { type: String, required: true },
  },
  { timestamps: true }
)

schema.index({ nftCharacterId: 1 })
schema.index({ sessionId: 1 })
schema.index({ type: 1 })
schema.index({ state: 1 })

mongoose.model('Quest', schema)

module.exports = mongoose.model('Quest')
