'use strict'

const { ethers } = require('ethers')
// const { MintableNonFungibleToken: contractAbi } = require('non-fungible-token-abi')
const contractAbi = require('./contractAbi')
const { NETWORK, ALCHEMY_TOKEN, TEST_TOKEN_ID, TEST_TOKEN_URL } = process.env

class EtherService {
  constructor(logger) {
    this._logger = logger || console
  }

  async pullERC721Tokens(walletAddress, nftCollectionAddress) {
    const provider = new ethers.providers.AlchemyProvider(NETWORK, ALCHEMY_TOKEN)
    const contract = new ethers.Contract(nftCollectionAddress, contractAbi, provider)

    if (process.env.NODE_ENV === 'test') {
      return [{ id: TEST_TOKEN_ID, url: TEST_TOKEN_URL }]
    }

    const baseUri = await contract.baseURI()
    let tokenIds = []

    try {
      tokenIds = await contract.walletOfOwner(walletAddress)
    } catch (error) {
      this._logger.error('Error on contract.walletOfOwner')
      this._logger.error(error)
    }

    const nfts = []

    for (const tokenId of tokenIds) {
      const metadataUrl = `${baseUri}${tokenId}`
      nfts.push({ id: tokenId, url: metadataUrl })
    }

    return nfts
    // const numberOfMyTokens = await contract.balanceOf(address)
    // for (const myTokenIndex of numberOfMyTokens) {
    //   const tokenId = await contract.tokenOfOwnerByIndex(address, myTokenIndex)
    //   const uri = await contract.tokenURI(tokenId)
    // }
  }

}

module.exports = EtherService
