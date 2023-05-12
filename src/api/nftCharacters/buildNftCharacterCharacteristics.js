'use strict'

const { Read } = require('common-backend-js').operations
const { isNFTOwner } = require('../../helpers/roles')
const NftCharcaterService = require('../../services/NftCharcaterService')
// const OperationError = require('../../OperationError')

class BuildNftCharacterCharacteristics extends Read {
  constructor({ req, res, next }) {
    super({ req, res, next }, 'NftCharacter')
  }

  async action() {
    const { nftCollectionAddress, nftId } = this.variables
    isNFTOwner(this.context.auth, nftCollectionAddress, nftId)

    const nftCharcaterService = new NftCharcaterService(this.logger, this.context.auth)
    const data = await nftCharcaterService.pullNFTDetails(nftId)

    const { characteristics } = nftCharcaterService.parseNFTMetadata(data)

    this.object = { characteristics, nftCollectionAddress, nftId }
  }
}

module.exports = async (req, res, next) => {
  const operation = new BuildNftCharacterCharacteristics({ req, res, next })
  await operation.execute()
}
