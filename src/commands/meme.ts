import {
  CommandInteraction,
  Client,
  ApplicationCommandType,
  EmbedBuilder,
} from 'discord.js'
import { Command } from '../Command'
import { meme } from 'memejs'

type memeEmbet = {
  title: string
  url: string
  subreddit: string
  author: string
}

const altURL =
  'https://cdn.discordapp.com/attachments/971431997304094781/1048357331701862410/unknown.png'

export const memeCommand: Command = {
  name: 'meme',
  description: 'get a meme from reddit',
  options: [
    {
      name: 'subreddit',
      type: 3,
      description: 'What sub do u want the meme from',
      required: false,
      choices: [
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
      ],
    },
  ],
  type: ApplicationCommandType.ChatInput,
  run: async (client: Client, interaction: CommandInteraction) => {
    let subreddit =
      (interaction.options.get('subreddit')?.value! as string) ?? 'dankmemes'

    await meme(subreddit)
      .then((m) => createEmbed(m))
      .catch((e) => createEmbed(e))

    async function createEmbed(data: memeEmbet) {
      let embed: EmbedBuilder

      if (typeof data !== 'object') {
        embed = new EmbedBuilder()
          .setTitle('something went wrong')
          .setColor('Default')
          .setImage(altURL)
      } else {
        embed = new EmbedBuilder()
          .setTitle(data.title)
          .setColor('Default')
          .setImage(data.url)
          .setFooter({ text: `${data.subreddit}; ${data.author}` })
      }

      await interaction.followUp({
        ephemeral: true,
        embeds: [embed],
      })
    }
  },
}
