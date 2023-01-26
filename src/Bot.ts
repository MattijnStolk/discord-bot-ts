import { Client } from 'discord.js'

//listeners
import ready from './listeners/ready'
import interactionCreate from './listeners/interactionCreate'
import presenceUpdate from './listeners/presenceUpdate'
import guildMemberAdd from './listeners/guildMemberAdd'
import guildMemberRemove from './listeners/guildMemberRemove'

import * as dotenv from 'dotenv'
dotenv.config()

const client = new Client({
  intents: [
    'Guilds',
    'GuildPresences',
    'GuildMembers',
    'GuildMessages',
    'GuildMessageReactions',
  ],
})

guildMemberRemove(client)
guildMemberAdd(client)
ready(client)
interactionCreate(client)
// presenceUpdate(client)

client.login(process.env.CLIENT_TOKEN)

// documentation
// https://discord.com/developers/docs/interactions/application-commands#authorizing-your-application
