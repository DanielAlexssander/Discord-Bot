const Discord = require("discord.js")

module.exports = {
  name: "embed", // Coloque o nome do comando
  description: "Fazer uma embed", // Coloque a descrição do comando
  type: Discord.ApplicationCommandType.ChatInput,
  adminOnly: true,
  options: [
    {
        name: "set_color",
        description: "Escreva sua cor em #HEX/RGB/Name.",
        type: Discord.ApplicationCommandOptionType.String,
        required: true,
    },
    {
        name: "set_title",
        description: "Escreva o título.",
        type: Discord.ApplicationCommandOptionType.String,
        required: false,
    },
    {
        name: "set_url",
        description: "Escreva a Url no título.",
        type: Discord.ApplicationCommandOptionType.String,
        required: false,
    },
    {
        name: "set_author",
        description: "Escreva o Autor.",
        type: Discord.ApplicationCommandOptionType.String,
        required: false,
    },
    {
        name: "set_authoricon",
        description: "Escreva o Icone do Autor.",
        type: Discord.ApplicationCommandOptionType.String,
        required: false,
    },
    {
        name: "set_authorurl",
        description: "Escreva a Url do Autor.",
        type: Discord.ApplicationCommandOptionType.String,
        required: false,
    },
    {
        name: "set_description",
        description: "Escreva a Descrição.",
        type: Discord.ApplicationCommandOptionType.String,
        required: false,
    },
    {
        name: "set_thumbnail",
        description: "Escreva a Url da Thumbnail.",
        type: Discord.ApplicationCommandOptionType.String,
        required: false,
    },
    {
        name: "set_image",
        description: "Escreva a Url da Imagem.",
        type: Discord.ApplicationCommandOptionType.String,
        required: false,
    },
    {
        name: "set_footer",
        description: "Escreva o Footer.",
        type: Discord.ApplicationCommandOptionType.String,
        required: false,

    }
  ],
  run: async (client, interaction) => {
    if (!interaction.member.permissions.has('Administrator')) return interaction.reply({ content: 'Você não tem permissões para isso.', ephemeral: true });

    const canal = await interaction.channel
    const setColor = interaction.options.getString("set_color")
    const setTitle = interaction.options.getString("set_title")
    const setUrl = interaction.options.getString("set_url")
    const setAuthor = interaction.options.getString("set_author")
    const setAuthorIcon = interaction.options.getString("set_authoricon")
    const setAuthorUrl = interaction.options.getString("set_authorurl")
    const setDescription = interaction.options.getString("set_description")
    const setThumbnail = interaction.options.getString("set_thumbnail")
    const setImage = interaction.options.getString("set_image")
    const setFooter = interaction.options.getString("set_footer")


    let embed = new Discord.EmbedBuilder()
          .setTimestamp()
          .setColor(setColor.charAt(0).toUpperCase() + setColor.slice(1))
          .setTitle(setTitle)
          .setURL(setUrl)
          .setAuthor({ name: setAuthor, iconURL: setAuthorIcon, url: setAuthorUrl })
          .setDescription(setDescription)
          .setThumbnail(setThumbnail)
          .setImage(setImage)
          .setFooter({ text: setFooter });
          

    interaction.deferReply();
    interaction.deleteReply();
    try {
      return await canal.send({ embeds: [embed]});
    } catch (e) {
      console.log(e)
    }
    

  }
}