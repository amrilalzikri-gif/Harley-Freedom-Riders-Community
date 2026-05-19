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
                .setDescription('Mention discord member')
                .setRequired(true))

        .addStringOption(option =>
            option.setName('logs')
                .setDescription('Jenis logs')
                .setRequired(true)
                .addChoices(
                    { name: 'Join', value: 'join' },
                    { name: 'Warn', value: 'warn' },
                    { name: 'Inactive', value: 'inactive' },
                    { name: 'Promotion', value: 'promotion' },
                    { name: 'Demotion', value: 'demotion' }
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
            .setColor('#4B2E2E')
            .setTitle('📜 Harley Freedom Riders — Logs Member')
            .setDescription(
`🏍️ **Name:** ${nama}
👤 **Discord:** ${discord}
📋 **Logs:** ${logs}
📌 **Reason:** ${reason}
📝 **Note:** ${note}`
            )
            .setImage('https://i.imgur.com/z9sLtwt.png')
            .setFooter({
                text: 'Harley Freedom Riders • Logs System'
            })
            .setTimestamp();

        await interaction.reply({
            embeds: [embed]
        });
    }
};
