import { Client } from 'discord.js'
import { findWelcomeChannel } from '../utils/findWelcomeChannel'

export default (client: Client): void => {
  client.on('guildMemberRemove', async (member) => {
    const welcomeChannel = findWelcomeChannel(member.guild)

    if (!welcomeChannel) {
      console.log(`No welcome channel found in ${member.guild.name}`)
      return
    }

    const message = await welcomeChannel.send(
      `${member.user.username} took the 🇱`
    )

    await message.react('🇱')
  })
}
