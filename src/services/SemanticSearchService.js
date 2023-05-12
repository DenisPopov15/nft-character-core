'use strict'

const { RecursiveCharacterTextSplitter } = require('langchain/text_splitter')
const { Document } = require('langchain/document')
const PineconeService = require('./PineconeService')
const BotService = require('./BotService')

const mockedSemanticSearch = require('../../test/mocks/semanticSearch')

const DEFAULT_CHUNK_SIZE = 1000

class SemanticSearchService {
  constructor(logger) {
    this._logger = logger || console

    this._pineconeService = new PineconeService(this._logger)
    this._botService = new BotService(this._logger)
  }

  async init() {
    await this._pineconeService.init()
  }

  _buildDocumentsFromConversations(conversations) {
    let text = ''
    for (const conversation of conversations) {
      const { query, response } = conversation
      new Document({ pageContent: 'Bob has 5 apples' })
      text += `HUMAN: ${query}\n`
      text += `AI: ${response}\n`
    }

    const documents = this._buildDocumentsFromText(text)
    return documents
  }

  _buildDocumentsFromText(text) {
    // const text = fs.readFileSync('../book.txt', { encoding: 'utf8' })

    const textSplitter = new RecursiveCharacterTextSplitter({
      chunkSize: DEFAULT_CHUNK_SIZE,
    })

    const docs = textSplitter.createDocuments([text])
    return docs
  }

  async storeConversations(conversations, namespace) {
    const documents = this._buildDocumentsFromConversations(conversations)

    const texts = documents.map((doc) => { return doc.pageContent })
    const vectors = await this._botService.embedDocuments(texts)

    // TODO: to insert objects one after another - need to check on exists indexes and start from the last one + 1
    // in another case - its will be always overwrite
    const vectorObjects = vectors.map((values, idx) => ({
      id: `${idx}`,
      metadata: {
        ...documents[idx].metadata,
        text: documents[idx].pageContent,
      },
      values,
    }))

    const response = await this._pineconeService.upsertVectors(vectorObjects, namespace)
    return response
  }

  async search(query, namespace) {
    if (process.env.NODE_ENV === 'test') {
      return mockedSemanticSearch
    }

    const queryVector = await this._botService.embedQuery(query)

    const response = await this._pineconeService.findVectors(queryVector, namespace)
    const documents = []

    if (response && response.matches) {
      for (const res of response.matches) {
        const { text: pageContent, ...metadata } = res.metadata
        if (res.score) {
          const doc = new Document({ metadata, pageContent })
          documents.push(doc)
        }
      }
    }

    return documents
  }

}

module.exports = SemanticSearchService
