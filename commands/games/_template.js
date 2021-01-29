module.exports=class {
  constructor(th,channel,playerA,playerB=undefined){
    this.th=th
    this.channel = channel
    this.playerA = playerA.id
    this.playerB = playerB?playerB.id:undefined
    this.botPlayer = playerB == undefined || playerB.id == th.myId

  }
  imPlaying(id){return id == this.playerA || id == this.playerB}

  move(){


    this.print()
  }
  print(){

  }
  present(){

    this.print()
  }
  quit(){
    this.th.games.quitMe(this.playerA)
  }
}
