const discord = require('discord.js');

module.exports = {
    config: {
        customId: 'endTicket',
    },
    run: async (client, interaction) => {
        if (!interaction.member.roles.cache.has("1063905888726954065")) return interaction.reply({ content: 'Você não tem permissões para isso.', ephemeral: true });

        const sucessEmbed = new discord.EmbedBuilder()
        .setDescription('❌ O ticket será encerrado em **10 Segundos**.')
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

    },
}