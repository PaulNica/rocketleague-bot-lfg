const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

const rankColors = {
    'Bronze': 0xcd7f32,
    'Silver': 0xc0c0c0,
    'Gold': 0xffd700,
    'Platinum': 0x00bfff,
    'Diamond': 0x1e90ff,
    'Champion': 0x8a2be2,
    'Grand': 0xff1493,
    'Supersonic': 0xffffff
};

function rankImageUrl(rank) {
    const base = 'https://raw.githubusercontent.com/PaulNica/rocketleague-bot-lfg/main/assets/';
    const file = rank.toLowerCase().replace(/\s+/g, '-').replace('supersonic-legend', 'ssl');
    return `${base}${file}.webp`;
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('lfg')
        .setDescription('Trimite un mesaj LFG pentru Rocket League RO Hub')
        .addStringOption(option =>
            option.setName('platform')
                .setDescription('Pe ce platformă joci?')
                .setRequired(true)
                .addChoices(
                    { name: 'PC', value: 'PC' },
                    { name: 'PlayStation', value: 'PlayStation' },
                    { name: 'Xbox', value: 'Xbox' },
                    { name: 'Switch', value: 'Switch' },
                    { name: 'Any', value: 'Any' }
                ))
        .addIntegerOption(option =>
            option.setName('players')
                .setDescription('De câți jucători ai nevoie?')
                .setRequired(true)
                .addChoices(
                    { name: '1', value: 1 },
                    { name: '2', value: 2 }
                ))
        .addStringOption(option =>
            option.setName('region')
                .setDescription('Alege regiunea preferată')
                .setRequired(true)
                .addChoices(
                    { name: 'EU', value: 'EU' },
                    { name: 'US-East', value: 'USE' },
                    { name: 'Other', value: 'Other' }
                ))
        .addStringOption(option =>
            option.setName('playlist')
                .setDescription('Ce mod de joc vrei să joci?')
                .setRequired(true)
                .addChoices(
                    { name: 'Ranked 2v2', value: '2v2' },
                    { name: 'Ranked 3v3', value: '3v3' },
                    { name: 'Casual', value: 'Casual' },
                    { name: 'Hoops', value: 'Hoops' },
                    { name: 'Rumble', value: 'Rumble' },
                    { name: 'Dropshot', value: 'Dropshot' }
                ))
        .addStringOption(option =>
            option.setName('rank')
                .setDescription('Ce rank ai?')
                .setRequired(true)
                .addChoices(
                    { name: 'Supersonic Legend', value: 'Supersonic Legend' },
                    { name: 'Grand Champion III', value: 'Grand Champion III' },
                    { name: 'Grand Champion II', value: 'Grand Champion II' },
                    { name: 'Grand Champion I', value: 'Grand Champion I' },
                    { name: 'Champion III', value: 'Champion III' },
                    { name: 'Champion II', value: 'Champion II' },
                    { name: 'Champion I', value: 'Champion I' },
                    { name: 'Diamond III', value: 'Diamond III' },
                    { name: 'Diamond II', value: 'Diamond II' },
                    { name: 'Diamond I', value: 'Diamond I' },
                    { name: 'Platinum III', value: 'Platinum III' },
                    { name: 'Platinum II', value: 'Platinum II' },
                    { name: 'Platinum I', value: 'Platinum I' },
                    { name: 'Gold III', value: 'Gold III' },
                    { name: 'Gold II', value: 'Gold II' },
                    { name: 'Gold I', value: 'Gold I' },
                    { name: 'Silver III', value: 'Silver III' },
                    { name: 'Silver II', value: 'Silver II' },
                    { name: 'Silver I', value: 'Silver I' },
                    { name: 'Bronze III', value: 'Bronze III' },
                    { name: 'Bronze II', value: 'Bronze II' },
                    { name: 'Bronze I', value: 'Bronze I' }
                ))
        .addStringOption(option =>
            option.setName('mic_required')
                .setDescription('Este necesar microfonul?')
                .setRequired(true)
                .addChoices(
                    { name: 'Da', value: 'Da' },
                    { name: 'Nu', value: 'Nu' }
                )),

    async execute(interaction) {
        const platform = interaction.options.getString('platform');
        const players = interaction.options.getInteger('players');
        const region = interaction.options.getString('region');
        const playlist = interaction.options.getString('playlist');
        const rank = interaction.options.getString('rank');
        const mic = interaction.options.getString('mic_required');

        const colorKey = Object.keys(rankColors).find(key => rank.includes(key)) || 'Champion';

        const embed = new EmbedBuilder()
            .setAuthor({ name: `${interaction.member.displayName} caută echipă!` })
            .setColor(rankColors[colorKey])
            .setDescription(
                `- 🖥️ Platformă: \`${platform}\`\n` +
                `- 🌍 Regiune: \`${region}\`\n` +
                `- 🎮 Mod de joc: \`${playlist}\`\n` +
                `- 🏅 Rank: \`${rank}\`\n` +
                `- 👥 Jucători necesari: \`${players}\`\n` +
                `- 🎤 Microfon necesar: \`${mic}\``
            )
            .setThumbnail(rankImageUrl(rank));

        await interaction.reply({ embeds: [embed] });
    }
};