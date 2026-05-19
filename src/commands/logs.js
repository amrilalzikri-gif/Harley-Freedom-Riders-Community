const {
    SlashCommandBuilder,
    EmbedBuilder
} = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('logs')
        .setDescription('Membuat logs member Harley Freedom Riders')

        .addStringOption(option =>
            option.setName('nama')
                .setDescription('Nama member')
                .setRequired(true))

        .addUserOption(option =>
            option.setName('discord')
                .setDescription('Mention user Discord')
                .setRequired(true))

        .addStringOption(option =>
            option.setName('logs')
                .setDescription('Jenis logs')
                .setRequired(true)
                .addChoices(
                    { name: 'Join', value: 'Join' },
                    { name: 'Warn', value: 'Warn' },
                    { name: 'Inactive', value: 'Inactive' },
                    { name: 'Promotion', value: 'Promotion' },
                    { name: 'Demotion', value: 'Demotion' }
                ))

        .addStringOption(option =>
            option.setName('reason')
                .setDescription('Alasan logs')
                .setRequired(true))

        .addStringOption(option =>
            option.setName('note')
                .setDescription('Catatan tambahan')
                .setRequired(false)),

    async execute(interaction) {

        const nama = interaction.options.getString('nama');
        const discord = interaction.options.getUser('discord');
        const logs = interaction.options.getString('logs');
        const reason = interaction.options.getString('reason');
        const note = interaction.options.getString('note') || '-';

        const embed = new EmbedBuilder()
            .setColor('#1E90FF')
            .setTitle('📜 Harley Freedom Riders — Logs Member')
            .setDescription(
`• **Name:** ${nama}
• **Discord:** ${discord}
• **Logs:** ${logs}
• **Reason:** ${reason}
• **Note:** ${note}`
            )
            .setImage('https://i.imgur.com/FzqQxjK.png')
            .setFooter({
                text: 'Harley Freedom Riders • Logs System'
            })
            .setTimestamp();

        await interaction.reply({
            embeds: [embed]
        });
    }
};