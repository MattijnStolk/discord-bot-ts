import { Client, TextChannel } from 'discord.js'

let WELCOMECHANNELIDS = ['934587433331347546', '796696201067888651', '1254375703202496602']
let SERVERIDS = ['934587258961539144', '796103676149628929', '810809827458416640']

export default (client: Client): void => {
  client.on('guildMemberRemove', async (member) => {
    let currentserver = member.guild.id
    if (!SERVERIDS.includes(currentserver)) {
      console.log('Not in the right server')
      return
    }

    let welcomeChannels = WELCOMECHANNELIDS.map(id => client.channels.cache.find(channel => channel.id === id)).filter(Boolean) as TextChannel[];

    let correctWelcomeChannel = welcomeChannels.find(channel => channel.guild.id == currentserver)

    if (correctWelcomeChannel == undefined) {
      console.log('No welcome channel found')
      return
    }
    
    correctWelcomeChannel.send(`${member.user.username} took the 🇱`)

    setTimeout(() => {
      const message = correctWelcomeChannel.lastMessage
      message?.react('🇱')
    }, 500)
  })
}
