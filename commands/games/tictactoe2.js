module.exports=class {
  constructor(th,channel,creator,tokens){
    this.properties={
      minPlayers:1
      ,maxPlayers:2
      ,title:"TicTacToe"
    }
    this.th=th
    this.channel = channel
    this.tokens = tokens
    this.creator = creator
    this.players = filterTokensPlayers(th,tokens)
    this.players.push(creator.id)
    this.botPlayer =false//= playerB == undefined || playerB.id == th.myId

    this.icons = ['🔳','❌','🔘']
    this.board = [0,0,0,0,0,0,0,0,0]//0 void; 1 x; 2 o
    this.numbers =['0️⃣','1️⃣','2️⃣','3️⃣','4️⃣','5️⃣','6️⃣','7️⃣','8️⃣','9️⃣','🔟']

    this.msg={board:undefined,info:undefined}
    // this.channel.send(this.players)
    this.setupPlayers(this.players)
    this.t=this.turn(0)//


  }
  imPlaying(id){return this.players.indexOf(id)>=0}

  move(tokens,msg){
    let n = tokens[0]
    if (isNaN(n) || (n<=0 || n>9) || this.board[n-1]!=0) {
          msg.react('😡')
    }else{
      this.step(n-1)
    }
  }

  step(position = undefined){
    // console.log(position)
    this.board[position]=this.t+1

    this.t = this.turn()
    // this.print()
    this.showBoard()
  }
  print(){

  }
  async load(){
    // this.setupPlayers(this.players)

    let res = `Començant partida de **${this.properties.title}** amb `
    for (var i = 0; i < this.players.length; i++) {
      res+=this.mention(this.players[i])+" "
    }
    //add minisudoqu
    res += this.showSudoqu()
    res+=`\nPer jugar utilitza **${this.th.conf.simb}play n** amb el numero de la casella`+
    `\nPer deixar de jugar utilitza **${this.th.conf.simb}play quit**`

    this.channel.send(res)

    this.showBoard()
    //this.print()
  }
  quit(){
    console.log('quiting');
    this.th.games.quitMe(this.players[0]/*this.creator.id*/)
  }

  //TIC TAC TOE UTILS

  async showBoard(){
    let res = ""

    //if has previous board, delete it

    //the actual board
    for (var i = 0; i < this.board.length; i++) {
      if (i%3==0) {
        res+='\n'
      }
      res+= this.icons[this.board[i]]
    }

    //reactions of free cells
    let nmsg = await this.channel.send(res)
    for (var i = 0; i < this.board.length; i++) {
      if(this.board[i]==0){
        nmsg.react(this.numbers[i+1])
      }
    }

    if(this.msg.board){
      this.msg.board.delete()
      this.msg.board=nmsg
    }

    this.showTurn()


    //await the reaction
    const filter = (reaction, user) => {return user.id != this.th.myId};
    nmsg.awaitReactions(filter, { max:1, time: 60000, errors: ['time'] })//al seleccionar un juego por emoji
      .then(collected => {
        const reaction = this.numbers.indexOf(collected.first().emoji.name)-1

        // console.log('reaction',reaction);

        if(reaction <0  || reaction>=9 || this.board[reaction]!=0){
          nmsg.react('😡')
          //deberia seguir awaitingReactions
        }else{
          nmsg.delete();
          this.step(reaction)
        }

      }).catch(console.error)

  }

  showSudoqu(){
    let res = ""
    for (var i = 0; i < 9; i++) {
      if (i%3==0) {res+='\n'}
      res+=this.numbers[i+1]//🔳
    }
    return res
  }

  async showTurn(){
    let pretext = `Es el torn de: `
    let text = `${this.icons[this.t+1]} ${this.mention(this.players[this.t])}`
    // let nmsg = await this.th.think2(this.channel,text,1500,3000,pretext)
    let nmsg = await this.channel.send(pretext + text)

    if(this.msg.info){
      this.msg.info.delete()
      this.msg.info=nmsg
    }
  }

  setupPlayers(players){
    if(players.length<2){
      players.push(this.th.myIdStr)
      this.botPlayer = true
    }else if(players.length>this.properties.maxPlayers) {
      this.channel.send("Massa gent en aquesta partida")
      return
    }
  }

  //-----------------GAME UTILS---------------
  turn(next = 1){
    if(next == 0){//0 == random
      console.log(this.players);
      return Math.floor(Math.random()*this.players.length)
    }
    return (this.t+next)%this.players.length
  }
  mention = (a) => `<@${a}>`


}//titTacToe class






// GAME UTILS

function filterTokensPlayers(th,tokens){
  let result = [];
  for (var i = 0; i < tokens.length; i++) {
    let player = th.getUserFromMention(tokens[i]);
    if(player != undefined){
      result.push(player);
    }
  }
  return result;
}
