import {
  ChatInputCommandInteraction,
  Client,
  ApplicationCommandType,
  EmbedBuilder,
  ApplicationCommandOptionType,
} from 'discord.js'
import { Command } from '../CommandType'
import { meme } from 'memejs'
import { getRandomMeme } from '../Services/memeService'

interface Meme {
  title: string
  url: string
  subreddit: string
  author: string
}

const DEFAULT_SUBREDDIT = 'dankmemes'
const FALLBACK_IMAGE_URL = 'https://i.imgflip.com/4u6pjy.jpg'
const SUBREDDIT_CHOICES = [
  {
    name: 'Dank Memes',
    value: 'dankmemes',
  },
  {
    name: 'me irl',
    value: 'me_irl',
  },
  {
    name: 'Formule Dank',
    value: 'formuladank',
  },
  {
    name: 'Dark memes',
    value: 'Darkmemes4u',
  },
  {
    name: 'Soccer Memes',
    value: 'soccermemes',
  },
]

export const memeCommand: Command = {
  name: 'meme',
  description: 'get a meme from reddit',
  type: ApplicationCommandType.ChatInput,
  options: [
    {
      name: 'subreddit',
      type: ApplicationCommandOptionType.String,
      description: 'What sub do u want the meme from',
      required: false,
      choices: SUBREDDIT_CHOICES,
    },
  ],
  run: async (_client: Client, interaction: ChatInputCommandInteraction) => {
    const subreddit =
      interaction.options.getString('subreddit') ?? DEFAULT_SUBREDDIT

    await interaction.deferReply()

    try {
      const data = await getRandomMeme(subreddit)

      await interaction.editReply({
        embeds: [createMemeEmbed(data)],
      })
    } catch (error) {
      console.error(`Failed to fetch meme from r/${subreddit}:`, error)

      await interaction.editReply({ embeds: [createErrorEmbed()] })
    }
  },
}

function createMemeEmbed(data: Meme): EmbedBuilder {
  return new EmbedBuilder()
    .setTitle(data.title)
    .setImage(data.url)
    .setFooter({
      text: `r/${data.subreddit} • u/${data.author}`,
    })
}

function createErrorEmbed(): EmbedBuilder {
  return new EmbedBuilder()
    .setTitle('Something went wrong')
    .setImage(FALLBACK_IMAGE_URL)
}
