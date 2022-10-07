module.exports=class {
  constructor(th,channel,playerA,playerB=undefined){
    this.th=th
    this.channel = channel
    this.playerA = playerA.id
    this.playerB = playerB?playerB.id:undefined
    this.botPlayer = playerB == undefined || playerB.id == th.myId
    this.board = new Array(4*4).fill(0);//[0,0,0...]
    this.directions = ['⬅️','⬆️','➡️','⬇️']
  }
  imPlaying(id){return id == this.playerA || id == this.playerB}

  move(){
    this.print()
  }
  print(){

  }
  formatBoard(){
    return this.board.join(' ')
  }
  async present(){
    this.channel.send("Començant partida de 2048")
    // this.msg
    let nmsg = await this.channel.send(this.formatBoard())
    for (var i = 0; i < this.directions.length; i++) {
      nmsg.react(this.directions[i])
    }
    // nmsg.awaitReactions((r,u) => this.directions.includes(r.emoji.name)&&u.id==this.playerA, { max: 10, time: 60000, errors: ['time'] }).then(collected => {
    //   console.log(collected);
    // })
    const filter = (reaction, user) => this.directions.includes(reaction.emoji.name)&& user.id === this.playerA
    nmsg.awaitReactions(filter, { time: 15000 })
      .then(collected => console.log(`Collected ${collected.size} reactions`))
      .catch(console.error);
    this.print()
  }
  quit(){
    this.th.games.quitMe(this.playerA)
  }
}
