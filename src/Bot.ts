import { Client } from "discord.js";
import ready from "./listeners/ready"
import interactionCreate from "./listeners/interactionCreate"
import * as dotenv from 'dotenv'

dotenv.config()

const client = new Client({
    intents: []
})

ready(client)
interactionCreate(client)

client.login(process.env.DISCORDKEY)

// documentation
// https://discord.com/developers/docs/interactions/application-commands#authorizing-your-application