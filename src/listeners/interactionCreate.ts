import { ChatInputCommandInteraction, Client, Interaction } from 'discord.js'

import { Commands } from '../Commands'

export default (client: Client): void => {
  client.on('interactionCreate', async (interaction: Interaction) => {
    if (!interaction.isChatInputCommand()) {
      return
    }

    await handleSlashCommand(client, interaction)
  })
}

const handleSlashCommand = async (
  client: Client,
  interaction: ChatInputCommandInteraction
): Promise<void> => {
  const command = Commands.find(
    (command) => command.name === interaction.commandName
  )

  if (!command) {
    console.warn(`Unknown command: ${interaction.commandName}`)
    return
  }

  try {
    await command.run(client, interaction)
  } catch (error) {
    console.error(`Error while executing /${interaction.commandName}:`, error)

    if (interaction.replied || interaction.deferred) {
      await interaction.editReply({
        content: 'Something went wrong while executing this command.',
      })
    } else {
      await interaction.reply({
        content: 'Something went wrong while executing this command.',
        ephemeral: true,
      })
    }
  }
}
