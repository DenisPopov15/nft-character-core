'use strict'

const mongoose = require('mongoose')

const Schema = mongoose.Schema

const schema = new Schema(
  {
    name                 : { type: String, required: true },
    nftCollectionAddress : { type: String, required: true },
    nftId                : { type: String, required: true },
    story                : { type: String },
    characteristics      : { type: String },
    avatarUrl            : { type: String },
    createdBy            : { type: String, required: true },
  },
  { timestamps: true }
)

schema.index({ createdBy: 1 })
schema.index({ nftCollectionAddress: 1 })

mongoose.model('NftCharacter', schema)

module.exports = mongoose.model('NftCharacter')
