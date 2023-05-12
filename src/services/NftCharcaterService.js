'use strict'

// const OperationError = require('../OperationError')
const ApiService = require('./ApiService')

class NftCharcaterService {
  constructor(logger, auth) {
    this._logger  = logger
    this._auth    = auth
    this._nftMetadata = null
  }

  _getNFTInfo(nftId) {
    const nft = this._auth.nfts.find(n => {
      return n.id === nftId
    })

    return nft
  }

  async pullNFTDetails(nftId) {
    const { url, id } = this._getNFTInfo(nftId)
    const baseUrl = url.replace(id, '')

    if (process.env.NODE_ENV === 'test') {
      return require('../../test/mocks/nftMetadata.json')
    }

    const apiService = new ApiService(baseUrl, {}, this._logger)
    const data = await apiService.execute(id, 'GET')

    return data
  }

  _mapAttributesIntoCharacteristic(attributes) {
    let characteristics = ''
    for (const attribute of attributes) {
      const { trait_type, value } = attribute
      characteristics += `${trait_type}: ${value}\n`
    }

    return characteristics
  }

  parseNFTMetadata({ name, image, attributes }) {
    const characteristics = this._mapAttributesIntoCharacteristic(attributes)
    const avatarUrl = image.replace('ipfs://', 'https://ipfs.io/ipfs/')

    return { name, avatarUrl, characteristics }
  }

}

module.exports = NftCharcaterService