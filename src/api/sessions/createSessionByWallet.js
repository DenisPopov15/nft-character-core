'use strict'

const { Create } = require('common-backend-js').operations
const { ethers } = require('ethers')
const { uuid } = require('uuidv4')

const createAuth     = require('../../helpers/createAuth')
const OperationError = require('../../OperationError')

const EtherService = require('../../services/EtherService')
const NftCharcaterService = require('../../services/NftCharcaterService')

const { LOGIN_PAYLOAD, systemAdmin, user: userRole } = require('../../helpers/const')
let { SYSTEM_ADMIN_ADDRESSES } = process.env
SYSTEM_ADMIN_ADDRESSES = SYSTEM_ADMIN_ADDRESSES.split(',')

class CreateSessionByWallet extends Create {
  constructor({ req, res, next }) {
    super({ req, res, next }, 'Session')
  }

  async _validateIfAddressOwnTokens(walletAddress, nftCollectionAddress) {
    const etherService = new EtherService(this.logger)
    const nfts = await etherService.pullERC721Tokens(walletAddress, nftCollectionAddress)

    if (nfts.length === 0) {
      throw new OperationError('NCC-2', { walletAddress, nftCollectionAddress })
    }

    return nfts
  }

  async before() {
    const MILISECONDS_IN_MINUTE = 1 * 60 * 1000
    const { digest, signature, nftCollectionAddress } = this.parameters

    let walletAddress
    try {
      walletAddress = ethers.utils.verifyMessage(digest, signature)
    } catch (error) {
      throw new OperationError('NCC-3', { signature }, error)
    }

    let { expiresAt, payload } = JSON.parse(digest)
    if (payload !== LOGIN_PAYLOAD) {
      throw new OperationError('NCC-4', { payload })
    }

    expiresAt = new Date(expiresAt).getTime()
    const now = Date.now()

    if (expiresAt < now) {
      throw new OperationError('NCC-5', { expiresAt })
    }

    if (now + MILISECONDS_IN_MINUTE < expiresAt) {
      throw new OperationError('NCC-4', { payload })
    }

    const nfts = await this._validateIfAddressOwnTokens(walletAddress, nftCollectionAddress)
    const parsedNfts = []
    const nftCharcaterService = new NftCharcaterService(this.logger, { nfts })
    for (const nft of nfts) {
      const metadata = await nftCharcaterService.pullNFTDetails(nft.id)
      const parsedNft = Object.assign({}, nft, { metadata })
      parsedNfts.push(parsedNft)
    }

    this._userScope = {
      nftCollectionAddress,
      nfts,
      parsedNfts
    }

    this._walletAddress = walletAddress
  }

  async action() {
    // const { id: sessionId } = this.Model('Session').create({ userId: this._userId })
    const { nftCollectionAddress, nfts, parsedNfts } = this._userScope

    let role = userRole
    if (SYSTEM_ADMIN_ADDRESSES.includes(this._walletAddress)) {
      role = systemAdmin
    }

    const sessionId = uuid()
    const token = createAuth(this._walletAddress, role, { nftCollectionAddress, nfts, sessionId })
    this.object = { token, nfts: parsedNfts }
  }
}

module.exports = async (req, res, next) => {
  const operation = new CreateSessionByWallet({ req, res, next })
  await operation.execute()
}
