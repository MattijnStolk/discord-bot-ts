import { CommandInteraction, Client, ApplicationCommandType, } from "discord.js";
import { Command } from "../Command";

import translate from '@iamtraction/google-translate';
import interactionCreate from "src/listeners/interactionCreate";

export const translateCommand: Command = {
    name: "translate",
    description: "translates the last 10 msgs",
    options: [
        {
            name: 'limit',
            type: 4,
            description: 'how many messages you want to translate',
            required: false,
            max_value: 25
        },
    ],
    type: ApplicationCommandType.ChatInput,
    run: async (client: Client, interaction: CommandInteraction) => {
        //get value of limit from the command
        let numberLimit = interaction.options.get('limit')!.value! as number ?? 10

        let replies = []

        //get the channel
        let interactionChannel = interaction.channelId
        let channel = await client.channels.fetch(interactionChannel)

        if(!channel!.isTextBased()) return;
    
        //get the messages from the channel
        const messages = await channel.messages.fetch({ limit: numberLimit });

        for (const message of messages) {
            //translate all the messages individually
            const translated = await translate(message[1].content, {to: 'en'})

            //if not bot, push them to the replies array
            if (!message[1].author.bot) {
                replies.push(`${message[1].author.username} said: ${translated.text}`)
            }
        }

        //reverse the array and make it into a string
        const content = replies.reverse().join(' \n')

        await interaction.followUp({
            ephemeral: true,
            content
        });
    }
};