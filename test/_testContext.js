const { TEST_SESSION_ID } = require('../src/helpers/const')

const testContext = (nftCollectionAddress, nfts) => {
  const { TEST_TOKEN_ID, TEST_TOKEN_URL, TEST_NFT_ADDRESS } = process.env

  return {
    nftCollectionAddress: nftCollectionAddress || TEST_NFT_ADDRESS,
    nfts: nfts || [{ id: TEST_TOKEN_ID, url: TEST_TOKEN_URL }],
    sessionId: TEST_SESSION_ID
  }
}

module.exports = testContext
