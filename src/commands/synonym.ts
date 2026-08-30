import {
  ChatInputCommandInteraction,
  Client,
  ApplicationCommandType,
  ApplicationCommandOptionType,
} from 'discord.js'
import { Command } from '../CommandType'
const tcom = require('thesaurus-com')

export const synonymCommand: Command = {
  name: 'synonym',
  description: 'Get a synonym to help understand a word',
  type: ApplicationCommandType.ChatInput,
  options: [
    {
      name: 'word',
      type: ApplicationCommandOptionType.String,
      description: 'What word do you want a synonym for?',
      required: true,
    },
  ],
  run: async (_client: Client, interaction: ChatInputCommandInteraction) => {
    await interaction.deferReply()

    try {
      if (interaction.options.get('word')) {
        const word = interaction.options.get('word')?.value

        if (typeof word !== 'string') {
          await interaction.editReply('The value provided was not a string')
          return
        }
        const synonym = await tcom.search(word)

        interaction.editReply(synonym)
      } else {
        await interaction.editReply("you didn't specify a word to translate")
      }
    } catch (error) {
      console.error('Failed to get synonym: ', error)

      await interaction.editReply('Something went wrong while getting synonym.')
    }
  },
}
