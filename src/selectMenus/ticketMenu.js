const { channel } = require('diagnostics_channel');
const discord = require('discord.js');

module.exports = {
    config: {
        customId: 'ticketMenu',
    },
    run: async (client, interaction) => {
        const guild = client.guilds.cache.get(interaction.guild.id);
        const guildChannels = guild.channels.cache;
        const ticketChannelName = `ticket-${interaction.user.username.toLowerCase()}-${interaction.values[0].replace('Option', '').toLowerCase()}`;

        const errorEmbed = new discord.EmbedBuilder()
            .setDescription('Você já possui um ticket aberto! Encerre o atual para abrir um novo.')
            .setColor('#ff0000')

        for (const channel of guildChannels.values()) {
            if (channel.name.startsWith('ticket')) {
                let ticketOwnerId = channel.topic;
                if (ticketOwnerId === interaction.user.id) {
                    return interaction.reply({ ephemeral: true, embeds: [errorEmbed] });
                }
            }
        }

        var ticketChannel = await guild.channels.create({
            name: `${ticketChannelName}`,
            type: discord.ChannelType.GuildText,
            //parent: '1053478895766208614',
            topic: `${interaction.user.id}`,
            permissionOverwrites: [
				{
					id: interaction.user.id,
					allow: [discord.PermissionFlagsBits.SendMessages, discord.PermissionFlagsBits.ViewChannel],
				},
				{
					id: interaction.guild.roles.everyone,
					deny: [discord.PermissionFlagsBits.ViewChannel],
                },
                {
					id: '1063905888726954065',
					allow: [discord.PermissionFlagsBits.SendMessages, discord.PermissionFlagsBits.ViewChannel],
				},
            ],
        });

       
        let ticketOption = '';
        if (interaction.values[0] === 'frontEndOption') {
            ticketOption = 'Front-End';
        }
        

        const ticketMenuEmbed = new discord.EmbedBuilder()
            .setAuthor({ iconURL: 'https://media.discordapp.net/attachments/894718530736496671/1063972552797605888/sdadas.png', name: 'WebSite Store 🛒' })
            .setDescription('🇧🇷 | Nos dê informações sobre o seu pedido, entraremos em contato em breve! ✅ \n⠀\n🇺🇸 | Give us  informations about your order, We will contact you soon! ✅\n⠀')
            .addFields([
                {
                    name: 'TIPO:',
                    value: `**${ticketOption}**`,
                    inline: true,
                }
            ])
            .setThumbnail(interaction.user.displayAvatarURL({ dynamic: true, size: 1024 }))
            .setColor('#00ff15')

        const ticketButtonsPainel = new discord.ActionRowBuilder()
            .addComponents(
            new discord.ButtonBuilder()
                .setCustomId('finishedProject')
                .setLabel('✅ Projeto Finalizado!')
                .setStyle('Secondary')
            )
            .addComponents(
                new discord.ButtonBuilder()
                    .setCustomId('endTicket')
                    .setLabel('❌ Encerrar Ticket')
                    .setStyle('Secondary')
            )

        await ticketChannel.send({ embeds: [ticketMenuEmbed], content: `||<@${interaction.user.id}>||`, components: [ticketButtonsPainel] });

        const sucessEmbed = new discord.EmbedBuilder()
            .setDescription('Seu ticket foi criado com sucesso.✅')
            .setColor('#00ff15')

        const goToTicketChannelButton = new discord.ActionRowBuilder()
            .addComponents(
                new discord.ButtonBuilder()
                    .setLabel('Ir para Ticket')
                    .setURL(ticketChannel.url)
                    .setStyle('Link')
            )

        await interaction.reply({embeds: [sucessEmbed], components: [goToTicketChannelButton], ephemeral: true});

    },
}
