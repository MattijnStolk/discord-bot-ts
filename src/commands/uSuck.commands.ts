import { CommandInteraction, Client, ApplicationCommandType, ApplicationCommandOptionType } from "discord.js";
import { Command } from "../Command";

export const uSuck: Command = {
    name: "you_suck",
    description: "Tells you that you suck",
    type: ApplicationCommandType.ChatInput,
    run: async (client: Client, interaction: CommandInteraction) => {
        const content = "Just kidding you're very nice.";

        await interaction.followUp({
            ephemeral: true,
            content
        });
    }
}