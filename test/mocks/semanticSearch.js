const { Document } = require('langchain/document')

const mocSemanticSearch = [
  new Document({ pageContent: 'Bob has 5 apples' }),
  new Document({ pageContent: 'Alise has 7 apples' }),
]

module.exports = mocSemanticSearch