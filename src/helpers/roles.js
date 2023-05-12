'use strict'

const OperationError = require('../OperationError')
const { systemAdmin, user } = require('./const')

const isSystemAdmin = (auth) => {
  const { role } = auth
  if (!role || role !== systemAdmin) {
    throw new OperationError('NCC-1')
  }
}

const isUser = (auth) => {
  const { role } = auth
  if (role && role !== user) {
    throw new OperationError('NCC-1')
  }
}

const hasNFTs = (auth) => {
  const { nfts } = auth
  if (!nfts || nfts.length === 0) {
    throw new OperationError('NCC-1')
  }
}

const isNFTOwner = (auth, nftCollectionAddress, nftId) => {
  const { nfts, nftCollectionAddress: userCollectionAddress } = auth
  if (!nfts || !userCollectionAddress || userCollectionAddress !== nftCollectionAddress) {
    throw new OperationError('NCC-1')
  }

  const nft = nfts.find(n => {
    return n.id === nftId
  })

  if (!nft) {
    throw new OperationError('NCC-1')
  }
}

module.exports = { isSystemAdmin, isUser, hasNFTs, isNFTOwner }
