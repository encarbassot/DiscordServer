module.exports=class {
  constructor(th,channel,creator,tokens){
    this.th=th
    this.channel = channel
    this.playerA = playerA.id
    this.tokens = tokens
    this.creator = creator
    this.players = []
    this.players.push(creator)
    //this.botPlayer = playerB == undefined || playerB.id == th.myId



  }
  imPlaying(id){return this.players.indexOf(id)>=0}

  move(){


    this.print()
  }
  print(){

  }
  load(){

    this.print()
  }
  quit(){
    this.th.games.quitMe(this.players[0]/*this.creator*/)
  }
}
