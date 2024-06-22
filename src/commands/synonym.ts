import { CommandInteraction, Client, ApplicationCommandType } from 'discord.js'
import { Command } from '../Command'
const tcom = require('thesaurus-com')

export const synonymCommand: Command = {
  name: 'synonym',
  description: 'Get a synonym to help understand a word',
  type: ApplicationCommandType.ChatInput,
  options: [
    {
      name: 'word',
      type: 2,
      description: 'What word do you want a synonym for?',
    //   required: true
    },
  ],
  run: async (client: Client, interaction: CommandInteraction) => {
    let translation: string
    let word: string

    if (interaction.options.get('word')) {
        word = interaction.options.get('word')!.value! as string

        translation = await tcom.search(word)
    } else {
        translation = "you didn't specify a word to translate"
    }

    await interaction.followUp({
      ephemeral: false,
      content: translation,
    })
  },
}
