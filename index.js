const { Client, GatewayIntentBits, Collection } = require('discord.js');
require('dotenv').config();

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

const lfgCommand = require('./lfg.js');
client.commands = new Collection();
client.commands.set(lfgCommand.data.name, lfgCommand);

client.once('ready', () => {
    console.log(`Bot ready as ${client.user.tag}`);
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isChatInputCommand()) return;
    const command = client.commands.get(interaction.commandName);
    if (!command) return;
    try {
        await command.execute(interaction);
    } catch (err) {
        console.error(err);
        await interaction.reply({ content: 'Eroare la executarea comenzii.', ephemeral: true });
    }
});

client.on('messageCreate', message => {
    const allowedChannel = '1380523074386001921'; // <-- replace with your real LFG channel ID
    const isCommand = message.content.startsWith('/');
    const isBot = message.author.bot;

    if (message.channel.id === allowedChannel && !isCommand && !isBot) {
        message.delete().catch(() => {});
    }
});


console.log("Using token:", process.env.BOT_TOKEN);
client.login(process.env.BOT_TOKEN);