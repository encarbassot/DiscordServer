module.exports=class {
  constructor(th,channel,creator,tokens){
    //console.log(tokens);
    this.info={
      "minPlayers":1
      ,"maxPlayers":2
    }
    this.th=th
    this.channel = channel
    this.players = []
    this.players.push(creator.id)
    this.playerB = tokens//playerB?playerB.id:undefined
    // this.botPlayer = playerB == undefined || playerB.id == th.myId
    console.log(th.getUserFromMention(tokens[1]));


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
    this.th.games.quitMe(this.playerA)
  }
}
