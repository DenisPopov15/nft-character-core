'use strict'

const { Create } = require('common-backend-js').operations
const { isNFTOwner } = require('../../helpers/roles')
const ValidationDBService = require('../../services/ValidationDBService')
const NftCharcaterService = require('../../services/NftCharcaterService')
// const OperationError = require('../../OperationError')

class CreateNftCharacter extends Create {
  constructor({ req, res, next }) {
    super({ req, res, next }, 'NftCharacter')
  }

  async before() {
    const {
      nftCollectionAddress,
      nftId,
    } = this.parameters

    isNFTOwner(this.context.auth, nftCollectionAddress, nftId)

    const validationDBService = new ValidationDBService(this.logger, this.Model)
    await validationDBService.validateRecordDoesNotExists({ nftCollectionAddress, nftId }, 'NftCharacter')

    if (!this.parameters.characteristics || !this.parameters.avatarUrl || !this.parameters.name) {
      const nftCharcaterService = new NftCharcaterService(this.logger, this.context.auth)
      const data = await nftCharcaterService.pullNFTDetails(nftId)

      const { name, avatarUrl, characteristics } = nftCharcaterService.parseNFTMetadata(data)

      this.parameters.name = this.parameters.name || name
      this.parameters.avatarUrl = this.parameters.avatarUrl || avatarUrl
      this.parameters.characteristics = this.parameters.characteristics || characteristics
    }

    this.parameters.createdBy = this.userId
  }

}

module.exports = async (req, res, next) => {
  const operation = new CreateNftCharacter({ req, res, next })
  await operation.execute()
}
