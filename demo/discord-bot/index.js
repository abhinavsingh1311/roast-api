import 'dotenv/config';
import process from 'process';
import { Client, Collection, GatewayIntentBits } from 'discord.js';
import RoastCommand from './commands/roast.js';

const client = new Client({
    intents: [GatewayIntentBits.Guilds]
});

client.commands = new Collection();
client.commands.set(RoastCommand.data.name, RoastCommand);

//ready events

client.once('ready', () => {
    console.log(`Bot is online as ${client.user.id}`);
});

//interactions

client.on('interactionCreate', async (interaction) => {
    if (!interaction.isChatInputCommand()) return;

    const command = client.commands.get(interaction.commandName);

    if (!command) {
        console.log(`Unknown command: ${interaction.commandName}`);
        return;
    }

    try {
        await command.execute(interaction);
    }
    catch (ex) {
        console.log('Command error:', ex);
        try {
            if (interaction.deferred || interaction.replied) {
                await interaction.editReply({ content: 'Error executing command' });
            } else {
                await interaction.reply({ content: 'Error executing command', flags: 64 });
            }
        } catch (replyError) {
            console.log('Failed to send error reply:', replyError.message);
        }
    }
});

client.login(process.env.DISCORD_TOKEN);