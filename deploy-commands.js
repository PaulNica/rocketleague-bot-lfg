const { REST, Routes } = require('discord.js');
const { clientId, guildId, token } = require('./config.json');
const lfgCommand = require('./lfg.js');

const commands = [lfgCommand.data.toJSON()];
const rest = new REST({ version: '10' }).setToken(token);

(async () => {
    try {
        console.log('⏳ Clearing global commands...');
        await rest.put(Routes.applicationCommands(clientId), { body: [] });

        console.log('🚀 Registering guild commands...');
        await rest.put(Routes.applicationGuildCommands(clientId, guildId), {
            body: commands,
        });

        console.log('✅ Commands deployed!');
    } catch (error) {
        console.error('❌ Error:', error);
    }
})();
