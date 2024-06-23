import { CommandInteraction, Client, ApplicationCommandType } from 'discord.js'
import { Command } from '../Command'

export const amigayCommand: Command = {
  name: 'amigay',
  description: "Ask the bot if it thinks you're gay",
  type: ApplicationCommandType.ChatInput,
  run: async (client: Client, interaction: CommandInteraction) => {
    if (
      interaction.guildId === '796103676149628929' ||
      interaction.guildId === '934587258961539144' ||
      interaction.guildId === '810809827458416640'
    ) {
      const newReplies = replies.concat(optionalReplies)
      // sendMSG(newReplies)
      sendMSG(replies)
    } else {
      sendMSG(replies)
    }

    async function sendMSG(array: string[]) {
      const index = Math.floor(Math.random() * array.length)
      let content = array[index].toString()

      await interaction.followUp({
        ephemeral: false,
        content,
      })
    }
  },
}

const replies = [
  'yes, you are',
  'you are very very gay',
  'No, idk where u got the idea',
  'ah u gayboi huh',
  'ask ur boyfriend',
  'you are about as straight as a roundabout',
  'No not at all',
  'Nah you like women',
  'I heard they\'re hiring in the red-light district.',
]

const optionalReplies = [
  `<@${process.env.NMEMBER}> wants to eat vlaai of your butt`,
  `<@${process.env.FMEMBER}> is looking at you in a very creepy way rn...`,
  `<@${process.env.AMEMBER}> would want to fuck the living shit out of you, but do remember that he is 12.`,
]
