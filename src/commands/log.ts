import { CommandInteraction, Client, ApplicationCommandType } from 'discord.js'
import { Command } from '../Command'

export const logCommand: Command = {
  name: 'log',
  description: 'for development',
  type: ApplicationCommandType.ChatInput,
  run: async (client: Client, interaction: CommandInteraction) => {
    const content = 'fuck off ur not supposed to use this'

    // console.log(interaction)

    await interaction.followUp({
      ephemeral: false,
      content,
    })
  },
}
