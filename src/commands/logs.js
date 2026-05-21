const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('logs')
        .setDescription('Mencatat log member baru atau keluar untuk Harley Freedom Riders')
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages) // Hanya untuk staff/admin
        .addStringOption(option =>
            option.setName('aksi')
                .setDescription('Pilih jenis log')
                .setRequired(true)
                .addChoices(
                    { name: 'Join (Bergabung)', value: 'join' },
                    { name: 'Leave (Keluar)', value: 'leave' }
                ))
        .addUserOption(option =>
            option.setName('member')
                .setDescription('Pilih member yang bersangkutan')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('nama_ic')
                .setDescription('Nama In-Character (IC) member')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('alasan')
                .setDescription('Alasan bergabung atau keluar')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('catatan')
                .setDescription('Catatan tambahan atau pesan selamat datang/perpisahan')
                .setRequired(false)),

    async execute(interaction) {
        const aksi = interaction.options.getString('aksi');
        const member = interaction.options.getUser('member');
        const namaIc = interaction.options.getString('nama_ic');
        const alasan = interaction.options.getString('alasan');
        const catatan = interaction.options.getString('catatan') || '-';

        // Menentukan format berdasarkan aksi (Join / Leave)
        const isJoin = aksi === 'join';
        const logTitle = isJoin ? '📜 Logs Member Join — Harley Freedom Riders' : '❌ Logs Member Leave — Harley Freedom Riders';
        const embedColor = isJoin ? '#FF6600' : '#D32F2F'; // Oranye Harley untuk Join, Merah untuk Leave
        const defaultNote = isJoin ? 'Welcome to the club, rajin ikut act ya!' : 'Ride in peace, brother.';
        
        const finalNote = catatan === '-' ? defaultNote : catatan;

        // Membuat Embed ala Discord Bot di screenshot
        const logEmbed = new EmbedBuilder()
            .setTitle(logTitle)
            .setColor(embedColor)
            .setDescription(
                `• **Name:** ${namaIc}\n` +
                `• **Discord:** <@${member.id}>\n` +
                `• **Logs:** ${aksi}\n` +
                `• **Reason:** ${alasan}\n` +
                `• **Note:** ${finalNote}`
            )
            .setImage('https://images.unsplash.com/photo-1558981806-ec527fa84c39?q=80&w=1000') // Placeholder gambar motor Harley, bisa diganti URL banner komunitasmu sendiri
            .setFooter({ 
                text: `Harley Freedom Riders • Logs System | Est. 2004`, 
                iconURL: interaction.guild.iconURL() 
            })
            .setTimestamp();

        // Mengirimkan log ke channel tempat command diketik
        await interaction.reply({ embeds: [logEmbed] });
    },
};
                     
