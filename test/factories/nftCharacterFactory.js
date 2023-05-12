'use strict'

const faker = require('faker')
const { factory } = require('factory-girl')

const { Model } = api

factory.define('NftCharacter', Model('NftCharacter'), {
  name                 : () => faker.datatype.string(),
  nftCollectionAddress : () => faker.datatype.hexaDecimal(40),
  nftId                : () => faker.datatype.string(),
  story                : () => faker.datatype.string(),
  characteristics      : () => faker.datatype.string(),
  avatarUrl            : () => 'https://example.com/avatar.jpg',
  createdBy            : () => faker.datatype.string(),
})
