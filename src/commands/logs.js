const {
    SlashCommandBuilder,
    EmbedBuilder
} = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('logs')
        .setDescription('Membuat logs member')

        .addStringOption(option =>
            option.setName('nama')
                .setDescription('Nama member')
                .setRequired(true))

        .addUserOption(option =>
            option.setName('discord')
                .setDescription('Mention discord')
                .setRequired(true))

        .addStringOption(option =>
            option.setName('logs')
                .setDescription('Jenis logs')
                .setRequired(true)
                .addChoices(
                    { name: 'Join', value: 'join' },
                    { name: 'Warn', value: 'warn' },
                    { name: 'Inactive', value: 'inactive' }
                ))

        .addStringOption(option =>
            option.setName('reason')
                .setDescription('Reason')
                .setRequired(true))

        .addStringOption(option =>
            option.setName('note')
                .setDescription('Note')
                .setRequired(false)),

    async execute(interaction) {

        const nama = interaction.options.getString('nama');
        const discord = interaction.options.getUser('discord');
        const logs = interaction.options.getString('logs');
        const reason = interaction.options.getString('reason');
        const note = interaction.options.getString('note') || '-';

        const embed = new EmbedBuilder()
            .setColor('#4DA6FF')
            .setTitle('📜 Logs Member — Classic Riders')
            .setDescription(
`• **Name:** ${nama}
• **Discord:** ${discord}
• **Logs:** ${logs}
• **Reason:** ${reason}
• **Note:** ${note}`
            )
            .setImage('https://i.imgur.com/yourbanner.png')
            .setFooter({
                text: 'Classic Riders • Logs System'
            })
            .setTimestamp();

        await interaction.reply({
            embeds: [embed]
        });
    }
};
