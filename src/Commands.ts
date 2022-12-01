import { Command } from "./Command";

import fs from 'node:fs'
import path from 'node:path'

const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.ts'))

let commands = []

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);

    const commandName = Object.keys(command).toString()

    commands.push(command[commandName])
}

export const Commands: Command[] = commands;
