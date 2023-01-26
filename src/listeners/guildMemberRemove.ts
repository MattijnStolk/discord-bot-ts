import { Client, TextChannel } from 'discord.js'
import { Commands } from '../Commands'

let WELCOMECHANNELID = '934587433331347546'
let SERVERID = '934587258961539144'

export default (client: Client): void => {
  client.on('guildMemberRemove', async (member) => {
    if (member.guild.id !== SERVERID) return
    let welcomeChannel = client.channels.cache.find(
      (channel) => channel.id === WELCOMECHANNELID
    ) as TextChannel
    welcomeChannel.send(`${member.user.username} took the 🇱`)

    setTimeout(() => {
      const message = welcomeChannel.lastMessage
      message?.react('🇱')
    }, 500)
  })
}
