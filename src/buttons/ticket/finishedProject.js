const discord = require('discord.js');
const { message, MessageFlags} = require('discord.js');
const { ProjectsChannelId } = require('../../config/config.json');

module.exports = {
    config: {
        customId: 'finishedProject',
    },
    run: async (client, interaction) => {
        const guild = client.guilds.cache.get(interaction.guild.id);
        const guildChannels = guild.channels.cache;
        if (!interaction.member.permissions.has('Administrator')) return interaction.reply({ content: 'Você não tem permissões para isso.', ephemeral: true });

        const sucessEmbed = new discord.EmbedBuilder()
        .setDescription('❌ O ticket será encerrado em **10 Segundos**, Obrigado pela a preferência!')
        .setColor('#ff0000')

        interaction.deferReply();
        interaction.deleteReply();

        interaction.channel.send({embeds: [sucessEmbed]});

        setTimeout(() => {
            try {
                interaction.channel.delete();
            } catch (err) {
                console.log(err);
                return;
            }
        }, 10000);

        let ticketOption = '';
        if (interaction.channel.name.endsWith('frontend')) {
            ticketOption = 'Front-End';
        }

        const userClient = await client.users.fetch(interaction.channel.topic)
        const ProjectsChannel = client.channels.cache.find(channel => channel.id === ProjectsChannelId);
        const embed = new discord.EmbedBuilder()
            .setAuthor({ iconURL: 'https://media.discordapp.net/attachments/894718530736496671/1063972552797605888/sdadas.png', name: 'WebSite Store 🛒' })
            .setTitle(`✅ Projeto finalizado!`)
            .setDescription(`**Projeto do <@${interaction.channel.topic}> foi finalizado! \n⠀**`)
            .addFields({name: 'TIPO:', value: `**${ticketOption}**`})
            .setThumbnail(userClient.displayAvatarURL({ dynamic: true, size: 1024 }))
            .setImage('https://cdn.discordapp.com/attachments/894718530736496671/1112982673426751498/standard.gif')
            .setColor('#069cf3')
            
        return await ProjectsChannel.send({ embeds: [embed]});
    },
}