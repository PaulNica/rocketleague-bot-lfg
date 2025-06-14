const { REST, Routes } = require('discord.js');
const { clientId, guildId, token } = require('./config.json');
const lfgCommand = require('./lfg.js');

const commands = [lfgCommand.data.toJSON()];

const rest = new REST({ version: '10' }).setToken(token);

(async () => {
    try {
        console.log('Registering /lfg command...');
        await rest.put(
            Routes.applicationGuildCommands(clientId, guildId),
            { body: commands },
        );
        console.log('Command registered!');
    } catch (error) {
        console.error(error);
    }
})();
