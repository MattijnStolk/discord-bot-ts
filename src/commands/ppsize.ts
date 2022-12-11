import { CommandInteraction, Client, ApplicationCommandType } from 'discord.js'
import { Command } from '../Command'

const randomReplies = [
  'Your PP size is small asf, are you even a boy?',
  "Your PP size couldn't be put into numbers.",
  'Your PP size is ' + randomNumber(-5, 25) + ' inches.',
  'Your PP size is ' + randomNumber(-5, 25) + ' inches.',
  'Your PP size is ' + randomNumber(-5, 50) + ' inches.',
  'Your PP size is ' + randomNumber(-5, 0) + ' inches.',
  'Your PP size is ' + randomNumber(-5, 25) + ' inches.',
  'Your PP size is ' + randomNumber(-5, 10) + ' inches.',
  'Your PP size is ' + randomNumber(-5, 25) + ' inches.',
  'Your PP size is ' + randomNumber(0, 5) + ' inches.',
  'This u? 8===============D',
  "Nice Cock bro, I bet you've worked hard on that! It's aproxomately 3.14159265358979323846 inches, call that a PInes or a Picock.",
]

export const ppsizeCommand: Command = {
  name: 'ppsize',
  description: 'ask the bot what the size of your pp is',
  type: ApplicationCommandType.ChatInput,
  run: async (client: Client, interaction: CommandInteraction) => {
    const index = Math.floor(Math.random() * randomReplies.length)
    const content = randomReplies[index]

    await interaction.followUp({
      ephemeral: false,
      content,
    })
  },
}

function randomNumber(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}
