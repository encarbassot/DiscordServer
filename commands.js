const commands ={//}
     "gif": require('./commands/gif.js')
  ,"8ball": require('./commands/8ball.js')
   ,"calc": require('./commands/calc.js')
   ,"play": require('./commands/play.js')
   ,"poll": require('./commands/poll.js')
   ,"vote": require('./commands/vote.js')
   ,"throw": require('./commands/throw.js')
}

/////////////////// TODO:
//DICE and COIN

module.exports.message=async (msg,th) => {

  let tokens = msg.content.split(' ')
  let command = tokens.shift()

  if (command.charAt(0)==th.conf.simb){//its a comand
    command = command.substr(1).toLowerCase()

      if (commands[command]) {//comando en la lista de comandos
        commands[command](th,msg,tokens)//lo ejecuta

      }// else {msg.channel.send('404 command not found')}

      //comandos sencillos pueden ser implementados aqui
      switch (command) {

        case "test":
          let nmsg = await msg.channel.send("puto")
          setTimeout(() => {nmsg.edit('i mean...');
            setTimeout(() => {nmsg.edit('Beep Boop!');}, 400);
          }, 200);
          break;

        case "think":
          th.think(msg,"not much to say 🤔",3000,6000)
          break;

        case "clear":
          msg.channel.send("clearing...."+'\n'.repeat(40)+'.')
          break;

        case "echo":
          msg.channel.send(th.str2emoji(tokens.join(' ')))
          break;

      }

  }//its a command
}


// module.exports.react= (msg,th) => {
//   console.log(msg);
// }
