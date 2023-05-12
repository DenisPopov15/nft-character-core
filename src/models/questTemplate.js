'use strict'

const mongoose = require('mongoose')

const Schema = mongoose.Schema

const QUEST_TEMPLATE_TYPES = ['quiz']

const schema = new Schema(
  {
    title       : { type: String, required: true },
    description : { type: String, required: true },
    tasks       : { type: Array, default: [] },
    type        : { type: String, enum: QUEST_TEMPLATE_TYPES },
    createdBy   : { type: String, required: true },
  },
  { timestamps: true }
)

schema.index({ type: 1 })

mongoose.model('QuestTemplate', schema)

module.exports = mongoose.model('QuestTemplate')
