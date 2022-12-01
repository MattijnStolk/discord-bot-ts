import { CommandInteraction, Client, ApplicationCommandType, ApplicationCommandOptionType } from "discord.js";
import { Command } from "../Command";

export const log: Command = {
    name: "log",
    description: "<template>",
    type: ApplicationCommandType.ChatInput,
    run: async (client: Client, interaction: CommandInteraction) => {
        const content = "<template>";

        //todo: get the channel the msg has been sent in

        console.log(interaction)

        await interaction.followUp({
            ephemeral: true,
            content
        });
    }
};