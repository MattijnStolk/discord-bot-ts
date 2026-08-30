import { Client, TextChannel } from 'discord.js'
import { findWelcomeChannel } from '../utils/findWelcomeChannel'

export default (client: Client): void => {
  client.on('guildMemberAdd', async (member) => {
    const currentserver = member.guild.id
    const welcomeChannel = findWelcomeChannel(member.guild)

    if (welcomeChannel == undefined) {
      console.log('No welcome channel found')
      return
    }

    const message = await welcomeChannel.send(
      `${member} Joined the cult, welcome!`
    )

    message.react('👋')
  })
}
