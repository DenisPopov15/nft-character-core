'use strict'

const { Create } = require('common-backend-js').operations
const { isNFTOwner } = require('../../helpers/roles')
const ValidationDBService = require('../../services/ValidationDBService')
const NftCharcaterService = require('../../services/NftCharcaterService')
const BotService = require('../../services/BotService')
// const OperationError = require('../../OperationError')

class CreateNftCharacterStory extends Create {
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

    const nftCharcaterService = new NftCharcaterService(this.logger, this.context.auth)
    const data = await nftCharcaterService.pullNFTDetails(nftId)
    const { name, characteristics } = nftCharcaterService.parseNFTMetadata(data)

    this._name = name
    this._characteristics = characteristics
  }

  async action() {
    const botService = new BotService(this.logger)
    const story = await botService.createStory(this._name, this._characteristics)

    this.object = { story }
  }
}

module.exports = async (req, res, next) => {
  const operation = new CreateNftCharacterStory({ req, res, next })
  await operation.execute()
}
