'use strict'

// https://platform.openai.com/account/rate-limits
const { OPENAI_API_KEY } = process.env
const { OpenAI } = require('langchain/llms')
const { ConversationChain, loadQAChain } = require('langchain/chains')
const { BufferMemory } = require('langchain/memory')
const { OpenAIEmbeddings } = require('langchain/embeddings')
// const { PromptTemplate } = require('langchain/prompts')

class BotService {
  constructor(logger) {
    this._logger = logger || console

    const chatGPTConfig = {
      openAIApiKey: OPENAI_API_KEY,
      modelName: 'text-davinci-003', // gpt-3.5-turbo
      maxTokens: 256,
      verbose: true,
    }

    this._chatModel = new OpenAI(chatGPTConfig)
    this._chain = new ConversationChain({ llm: this._chatModel })
    this._chainWithContext = loadQAChain(this._chatModel)
    this._embeddings = new OpenAIEmbeddings()
    this._contextDocuments = []
  }

  setCharacter(character) {
    // TODO: Implement
    return character
  }

  async setShortMemory(conversations) {
    const memory = new BufferMemory()
    for (const conversation of conversations) {
      const { query, response } = conversation
      await memory.saveContext({ Human: query }, { AI: response })
    }
    this._chain = new ConversationChain({ llm: this._chatModel, memory: memory })
  }

  setContextMemory(documents) {
    this._contextDocuments = documents
  }

  async embedQuery(query) {
    const response = await this._embeddings.embedQuery(query)
    return response
  }

  async embedDocuments(documents) {
    const response = await this._embeddings.embedDocuments(documents)
    return response
  }

  async createStory(name, characteristics) {
    const input = `Tell me a story about women from image with name: ${name} and next image characteristics: \n ${characteristics}`

    return this._call(input)
  }

  async ask(input) {
    return this._call(input)
  }

  async askWithContext(input, docs) {
    const documents = docs || this._contextDocuments

    return this._call(input, documents)
  }

  async _call(input, docs) {
    if (process.env.NODE_ENV === 'test') {
      const mockedStory = require('../../test/mocks/story')
      return mockedStory
    }

    if (docs) {
      const data = await this._chainWithContext.call({ input_documents: docs, question: input })
      return data.text
    } else {
      const data = await this._chain.call({ input })
      return data.response
    }

  }
}

module.exports = BotService
