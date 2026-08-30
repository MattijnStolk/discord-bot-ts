import {
  ApplicationCommandOptionType,
  ChatInputCommandInteraction,
  Client,
} from 'discord.js'
import { Command } from '../CommandType'
import translate from '@iamtraction/google-translate'

const DEFAULT_LIMIT = 10
const MAX_LIMIT = 25

export const translateCommand: Command = {
  name: 'translate',
  description: 'Translates the latest messages in the channel.',
  options: [
    {
      name: 'limit',
      type: ApplicationCommandOptionType.Integer,
      description: 'How many messages to translate (default: 10)',
      required: false,
      min_value: 1,
      max_value: MAX_LIMIT,
    },
  ],
  run: async (
    _client: Client,
    interaction: ChatInputCommandInteraction
  ): Promise<void> => {
    const limit =
      interaction.options.getInteger('limit', false) ?? DEFAULT_LIMIT

    const channel = interaction.channel

    if (!channel || !channel.isTextBased() || !('messages' in channel)) {
      await interaction.reply({
        content: 'I cannot read messages in this channel.',
        flags: 'Ephemeral',
      })

      return
    }

    await interaction.deferReply({ flags: 'Ephemeral' })

    try {
      const messages = await channel.messages.fetch({
        limit,
      })

      const userMessages = [...messages.values()]
        .filter((m) => !m.author.bot)
        .filter((m) => m.content.trim().length > 0)

      if (userMessages.length == 0) {
        await interaction.editReply('There are no messages to translate.')
      }

      const translations = await Promise.all(
        userMessages.map(async (m) => {
          const translated = await translate(m.content, {
            to: 'en',
          })

          return `**${m.author.username}:** ${translated.text}`
        })
      )

      const content = translations.join('\n')

      await interaction.editReply({
        content,
      })
    } catch (error) {
      console.error('Failed to translate messages: ', error)

      await interaction.editReply('Something went wrong while translating.')
    }
  },
}
