import {
  CommandInteraction,
  Client,
  ApplicationCommandType,
  EmbedBuilder,
} from 'discord.js'
import { Command } from '../Command'

const urls = [
  'https://pbs.twimg.com/media/EnT9jKRUcAIQRY8.jpg',
  'https://i.kym-cdn.com/photos/images/newsfeed/002/002/026/f6e',
  'https://i.kym-cdn.com/photos/images/newsfeed/002/001/990/f06.jpg',
]

export const fourKCommand: Command = {
  name: 'fourk',
  description: 'use this when someone is caught in 4k',
  type: ApplicationCommandType.ChatInput,
  run: async (client: Client, interaction: CommandInteraction) => {
    const index = Math.floor(Math.random() * urls.length)
    let text

    if (index == 1) {
      text = `Damn they caught ur ass in 8k`
    } else {
      text = `Damn they caught ur ass in 4k`
    }

    let embed: EmbedBuilder = new EmbedBuilder()
      .setTitle(text)
      .setImage(urls[index])

    await interaction.followUp({
      ephemeral: false,
      embeds: [embed],
    })
  },
}
