import { Client, TextChannel } from 'discord.js'

let WELCOMECHANNELIDS = ['934587433331347546', '796696201067888651']
let SERVERIDS = ['934587258961539144', '796103676149628929']

export default (client: Client): void => {
  client.on('guildMemberAdd', async (member) => {
    if (!SERVERIDS.includes(member.guild.id)) {
      console.log('Not in the right server')
      return
    }

    let welcomeChannels = WELCOMECHANNELIDS.map(id => client.channels.cache.find(channel => channel.id === id)).filter(Boolean) as TextChannel[];

    if (welcomeChannels.length === 0) {
      console.log('No welcome channel found')
      return
    }

    for (const channel of welcomeChannels) {
      console.log(channel.name)
    }

    // welcomeChannels[0].send(`${member} Joined the cult, welcome!`)

    setTimeout(() => {
      const message = welcomeChannels[0].lastMessage
      message?.react('👋')
    }, 500)
  })
}
