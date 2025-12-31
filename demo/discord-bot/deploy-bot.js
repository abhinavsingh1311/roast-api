import 'dotenv/config';
import { REST, Routes } from 'discord.js';
import roastCommand from './commands/roast.js';

const commands = [roastCommand.data.toJSON()];
const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);
(async () => {
    try {
        console.log("Registering slash command..");
        await rest.put(
            Routes.applicationGuildCommands(
                process.env.CLIENT_ID,
                process.env.GUILD_ID
            ),
            { body: commands }
        );
        console.log("Command registered");
    }
    catch (ex) {
        console.log("Failed to reggister:", ex);
    }
})();