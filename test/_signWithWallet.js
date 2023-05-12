'use strict'

const { ethers } = require('ethers')

const signWithWallet = async (digest) => {
  const Wallet = await ethers.Wallet.createRandom()

  const signature = await Wallet.signMessage(digest)
  const walletAddress = await Wallet.getAddress()

  return { signature, walletAddress }
}


module.exports = signWithWallet

