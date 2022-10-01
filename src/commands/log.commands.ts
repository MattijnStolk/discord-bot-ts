import { CommandInteraction, Client, ApplicationCommandType, ApplicationCommandOptionType } from "discord.js";
import { Command } from "../Command";

export const log: Command = {
    name: "log",
    description: "<template>",
    type: ApplicationCommandType.ChatInput,
    run: async (client: Client, interaction: CommandInteraction) => {
        const content = "<template>";

        await interaction.followUp({
            ephemeral: true,
            content
        });
    }
};