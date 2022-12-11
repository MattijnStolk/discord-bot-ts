import {
  CommandInteraction,
  Client,
  ApplicationCommandType,
  EmbedBuilder,
} from 'discord.js'
import { Command } from '../Command'
import { meme } from 'memejs'

const altURL =
  'https://cdn.discordapp.com/attachments/971431997304094781/1048357331701862410/unknown.png'

export const memeCommand: Command = {
  name: 'meme',
  description: '<template>',
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
    let data = {
      // this is used so the object doesn't break
      title: 'placeholder',
      url: 'www.placeholder.com',
      subreddit: 'placeholder',
      author: 'placeholder',
    }

    await meme(subreddit)
      .then((m) => createEmbed(m))
      .catch((e) => createEmbed(e))

    async function createEmbed(data: any) {
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
