import 'dotenv/config';
import process from 'process';
import { SlashCommandBuilder } from 'discord.js';

const data = new SlashCommandBuilder()
    .setName('roast')
    .setDescription('roast someone using AI')
    .addStringOption(option =>
        option
            .setName('target')
            .setDescription('Who to roast?')
            .setRequired(true)
    )
    .addStringOption(option =>
        option
            .setName('game')
            .setDescription('What game they failed at?')
            .setRequired(false)
    )
    .addStringOption(option =>
        option
            .setName('performance')
            .setDescription('how badly they did')
            .setRequired(false)
    )
    .addIntegerOption(option =>
        option
            .setName('heat')
            .setDescription('Roast Intensity (1-5)')
            .setMinValue(1)
            .setMaxValue(5)
            .setRequired(false)
    );

async function execute(interaction) {
    await interaction.deferReply();

    //extract options
    const target = interaction.options.getString('target');
    const game = interaction.options.getString('game') || 'unknown game';
    const performance = interaction.options.getString('performance') || 'played badly';
    const heat = interaction.options.getInteger('heat') || 3;

    //call api

    try {
        const response = await fetch(`${process.env.ROAST_API_URL}/v1/roast`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': process.env.ROAST_API_KEY
            },
            body: JSON.stringify({
                theme: 'GAMING',
                heat,
                length: 180,
                context: { name: target, game, performance }
            })
        });

        const data = await response.json();

        if (data.roast) {
            await interaction.editReply(`${data.roast}`);
        }
        else {
            await interaction.editReply("Failed to generate roast, try again.");
        }
    }
    catch (ex) {
        console.log('API Error:', ex);
        await interaction.editReply('Something went wrong.');
    }
}

export default { execute, data };