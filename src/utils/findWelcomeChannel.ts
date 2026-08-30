import { Guild, TextChannel } from 'discord.js'

const welcomeChannelName = 'welcome'

export function findWelcomeChannel(guild: Guild): TextChannel | undefined {
  const channels = guild.channels.cache

  return (
    channels.find(
      (channel): channel is TextChannel =>
        channel instanceof TextChannel &&
        channel.name.toLowerCase() === welcomeChannelName
    ) ??
    channels.find(
      (channel): channel is TextChannel =>
        channel instanceof TextChannel &&
        channel.name.toLowerCase().includes(welcomeChannelName)
    )
  )
}
