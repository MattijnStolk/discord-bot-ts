import { CommandInteraction, Client, ApplicationCommandType } from 'discord.js'
import { Command } from '../Command'

import translate from '@iamtraction/google-translate'

export const translateCommand: Command = {
  name: 'translate',
  description: 'translates the last 10 msgs',
  options: [
    {
      name: 'limit',
      type: 4,
      description: 'how many messages you want to translate',
      required: false,
      max_value: 25,
    },
  ],
  type: ApplicationCommandType.ChatInput,
  run: async (client: Client, interaction: CommandInteraction) => {
    let numberLimit: number = 10
    let replies: string[] = []

    //get value of limit from the command
    if (interaction.options.get('limit')) {
      numberLimit = interaction.options.get('limit')!.value! as number
    }

    //get the channel
    let interactionChannel = interaction.channelId
    let channel = await client.channels.fetch(interactionChannel)

    if (!channel!.isTextBased()) return

    //get the messages from the channel
    const messages = await channel.messages.fetch({ limit: numberLimit })

    for (const message of messages) {
      //translate all the messages individually
      const translated = await translate(message[1].content, { to: 'en' })

      //if not bot, push them to the replies array
      if (!message[1].author.bot) {
        replies.push(`${message[1].author.username} said: ${translated.text}`)
      }
    }

    //reverse the array and make it into a string
    const content = replies.reverse().join(' \n')

    await interaction.followUp({
      ephemeral: true,
      content,
    })
  },
}
