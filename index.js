//https://discord.com/oauth2/authorize?client_id=ID_BOT&scope=bot
const fetch = require('node-fetch')//necesario para el comando gif
const commandHandler = require('./commands.js')
const gameHandler = require('./games.js')
const Discord = require('discord.js')
const client = new Discord.Client()
require('dotenv').config()

//through es una clase que se pasa a cada archivo para que se pueda accedec a
//los modulos y otras variables globales
let through = require('./through.js')
const th = new through({client,fetch,process},gameHandler)


th.client.login(process.env.DISCORD_TOKEN)
th.client.on('ready',() => {
  console.log('bot Loged');
})

th.client.on('message',(msg) => {
  commandHandler.message(msg,th)
})


client.on('guildCreate', guild => {
  const channel = guild.channels.cache.find(channel => channel.type === 'text' && channel.permissionsFor(guild.me).has('SEND_MESSAGES'))
  channel.send("Gracias por invitarme a vuestro servidor\nUsa **!help** para ver todo lo que soy capaz de hacer")
})


// th.client.on('react',(msg) => {
//   commandHandler.react(msg,th)
// })
