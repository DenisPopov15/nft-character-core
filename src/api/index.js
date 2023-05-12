'use strict'

const createNftCharacterStory = require('./nftCharacters/createNftCharacterStory')
const createNftCharacter = require('./nftCharacters/createNftCharacter')
const indexMyNftCharacters = require('./nftCharacters/indexMyNftCharacters')

const createConversation = require('./conversations/createConversation')
const indexMyConversations = require('./conversations/indexMyConversations')
const deleteMyConversations = require('./conversations/deleteMyConversations')

const createQuest = require('./quests/createQuest')
const completeQuest = require('./quests/completeQuest')
const indexMyQuests = require('./quests/indexMyQuests')
const declineQuest = require('./quests/declineQuest')

const createQuestTemplate = require('./questTemplates/createQuestTemplate')
const indexQuestTemplates = require('./questTemplates/indexQuestTemplates')
const deleteQuestTemplate = require('./questTemplates/deleteQuestTemplate')

const createSessionByWallet = require('./sessions/createSessionByWallet')
const deleteMySession = require('./sessions/deleteMySession')

module.exports = {
  createNftCharacterStory,
  createNftCharacter,
  indexMyNftCharacters,
  createConversation,
  indexMyConversations,
  deleteMyConversations,
  createQuest,
  completeQuest,
  indexMyQuests,
  declineQuest,
  createQuestTemplate,
  indexQuestTemplates,
  deleteQuestTemplate,
  createSessionByWallet,
  deleteMySession,
}
