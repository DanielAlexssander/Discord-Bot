require('dotenv').config();
const { Client, GatewayIntentBits, Partials, Collection } = require('discord.js');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildBans,
        GatewayIntentBits.GuildMessageReactions,
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.GuildVoiceStates,
    ], 
    partials: [
        Partials.Message, 
        Partials.GuildMember, 
        Partials.Reaction, 
        Partials.User, 
        Partials.Channel, 
        Partials.GuildScheduledEvent,
    ],
});

['commands'].forEach(f => client[f] = new Collection());
['commands', 'events'].forEach(f => require(`./src/handlers/${f}`)(client));

client.login(process.env.TOKEN);


const { joinVoiceChannel } = require('@discordjs/voice');

client.on("ready", () => {
  let canal = client.channels.cache.get("1066848294195707944")
  if (!canal) return console.log("❌ Não foi possível entrar no canal de voz.")

  try {

    joinVoiceChannel({
      channelId: canal.id,
      guildId: canal.guild.id,
      adapterCreator: canal.guild.voiceAdapterCreator,
    })
    console.log(`✅ Entrei no canal de voz [ ${canal.name} ] com sucesso!`)

  } catch(e) {
    console.log(`❌ Não foi possível entrar no canal [ ${canal.name} ].`)
  }


  setInterval(function () {
    let canal = client.channels.cache.get("1066848294195707944")

    
    if (canal.members.size === 0) {
      try {
  
        joinVoiceChannel({
          channelId: canal.id,
          guildId: canal.guild.id,
          adapterCreator: canal.guild.voiceAdapterCreator,
        })
        console.log(`✅ Entrei no canal de voz [ ${canal.name} ] com sucesso!`)
    
      } catch(e) {
        console.log(`❌ Não foi possível entrar no canal [ ${canal.name} ].`)
      }
    }
  }, 1000);
  

})




const channelReact = "1064084582275743806"

client.on("messageCreate", message => {
    if(channelReact.includes(message.channel.id))
    message.react("✅")
})





