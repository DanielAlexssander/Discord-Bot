const discord = require('discord.js');
const { ticketChannelId } = require('../../config/config.json');

module.exports = {
    name: 'ticket',
    description: 'Criar mensagem de ticket.',
    type: discord.ApplicationCommandType.ChatInput,
    adminOnly: true,
    run: async (client, interaction) => {
        
        if (!interaction.member.permissions.has('Administrator')) return interaction.reply({ content: 'Você não tem permissões para isso.', ephemeral: true });
        const ticketChannel = client.channels.cache.find(channel => channel.id === ticketChannelId);
        if (interaction.channel.id !== ticketChannelId) return interaction.reply({ content: `Você não pode utilizar esse comando nesse chat. Utilize ${ticketChannel}` });

        const embed = new discord.EmbedBuilder()
            .setAuthor({ iconURL: 'https://media.discordapp.net/attachments/894718530736496671/1063972552797605888/sdadas.png', name: 'Bem-Vindo ao WebSite Store 🛒' })
            .setTitle('Sistema de Tickets')
            .setDescription('🇧🇷 | Selecione uma categoria abaixo para fazer o seu **Orçamento**!📋 \n⠀\n🇺🇸 | Select a category below to make your **Budget**!📋')
            .setColor('#000000')

        const ticketRow = new discord.ActionRowBuilder()
            .addComponents(
                new discord.SelectMenuBuilder()
                    .setCustomId('ticketMenu')
                    .setPlaceholder('Selecione a Categoria')
                    .addOptions(
                        {
                            label: 'Front-End',
                            description: 'Faça seu orçamento agora mesmo!',
                            value: 'frontEndOption',
                        }
                    )
            );

        interaction.deferReply();
        interaction.deleteReply();
        return await ticketChannel.send({ embeds: [embed], components: [ticketRow]});
    },
};