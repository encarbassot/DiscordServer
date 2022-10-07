const sources ={
  "TicTacToe": require('./games/tictactoe.js')
  ,"TicTacToe2": require('./games/tictactoe2.js')
  ,"rpg":require('./games/rpg.js')
  // ,"g2048": require('./games/2048.js')//coming soon
}
module.exports= async(th,msg,tokens) => {
  // msg.channel.send('recived:'+tokens.join(','))
  let g = th.games.imPlaying(msg.author.id)//false si no esta jugando
                                          //retorna el objeto juego en caso afirmativo
  if (g) {//si esta jugando
    if (tokens[0]=='quit') {//y envia el comando quit
      th.games.quitMe(msg.author.id)//se borra la partida
      // msg.channel.send("Okay :(")
      msg.react('😭')
      return
    }
    let kill = g.move(tokens,msg)//hace un movimiento y retorna true si la partida ha sido finalizada
    if (kill) {
      g.quit()
      return
    }
  }else {//NOT PLAYING
    let strGames = Object.keys(sources)
    if (tokens.length == 0) { //not ask for any game
      let text = "Games avaliable:\n"//se presentan los juegos disponibles
      for (var i = 0; i < strGames.length; i++) {
        text+= th.emoji.numbers[i+1]+' '+strGames[i]+'\n'
      }
      // text+='\nUse **!play n** or **!play name** or select the number: :arrow_down:'
      let nmsg = await msg.channel.send(text)
      for (var i = 0; i < strGames.length; i++) {//se anaden reacciones para interactuar
        nmsg.react(th.emoji.numbers[i+1])
      }

      const filter = (reaction, user) => {return user.id != th.myId};
      nmsg.awaitReactions(filter, { max:1, time: 60000, errors: ['time'] })//al seleccionar un juego por emoji
      	.then(collected => {
      		const reaction = collected.first();
          let i = th.emoji.numbers.indexOf(reaction.emoji.name)
          newGame(i,th,msg,tokens)//se crea el juego
      	})

    }else {//ASK FOR A GAME
      if (isNaN(tokens[0])) {//BY STR
        let ind = Object.keys(sources).indexOf(tokens[0])
        if(ind>=0)
           newGame(ind,th,msg,tokens)
      }else{//BY NUMBER
        let i = parseInt(tokens[0])
        if (i>0&&i<=strGames.length){
          newGame(i-1,th,msg,tokens)
        }
      }
    }
  }//NOT PLAYING

}//module.exports

function newGame(i,th,msg,tokens=[]){
  let game
  switch (i) {
    case 0:
      game = new sources.TicTacToe(th,msg.channel,msg.author,th.getUserFromMention(tokens[1]))
      th.games.push(game)
      game.load(msg)
      break;
    default:
      game = new (Object.values(sources)[i])(th,msg.channel,msg.author,tokens)
      th.games.push(game)
      game.load(msg)
      break;
  }

}
