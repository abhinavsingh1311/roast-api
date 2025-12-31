import 'dotenv/config';
import { REST, Routes } from 'discord.js';
import { data } from './commands/roast.js';

const commands = [data.toJSON()];
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