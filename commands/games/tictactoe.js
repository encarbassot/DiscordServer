module.exports = class TicTacToe {
  constructor(th,channel,playerA,playerB=undefined) {
    //❌⭕✖️⬜🔲🔳🔘
    this.vectors = [[0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,4,8], [0,4,8], [2,4,6]]
    this.icons = ['🔳','🔘','❌']
    this.numbers =['0️⃣','1️⃣','2️⃣','3️⃣','4️⃣','5️⃣','6️⃣','7️⃣','8️⃣','9️⃣','🔟']
    this.channel = channel
    this.playerA = playerA.id
    this.playerB = playerB?playerB.id:undefined
    this.board="0".repeat(9)
    this.turn = true
    this.botPlayer = playerB == undefined || playerB.id == th.myId
    this.botMoving = false
    this.gameStarted = false
    this.th=th
    // this.timestamp = Date.now()
  }

  imPlaying(id){return id == this.playerA || id == this.playerB}

  freePos(i){return this.board.charAt(i)=='0'}

  print(msg,callback=undefined){
    let res = ""
    for (var i = 0; i < this.board.length; i++) {
      if (i%3==0) {
        res+='\n'
      }
      res+= {"x":this.icons[2],'o':this.icons[1]}[this.board[i]]||this.icons[0]

    }
    let w = this.checkWin(),next,text =""
    next = this.who(w?!this.turn:this.turn)//? mention(this.playerA):(this.botPlayer?"**encarbasBOT**":mention(this.playerB))
    let ico = this.icons[this.turn?1:2]
    if (this.gameStarted){
      if (w==1) {
        text = '**HA GUANYAT:** '+this.who(!this.turn)
      }else if (w==2) {
        text = `Empate Tactico, bona partida ${this.who(true)} & ${this.who(false)}`
      }else {
        text = `Es el torn de: ${ico} ${next}`
      }

      if (msg == undefined) {//bot has played
        msg = {channel:this.channel}
        this.th.think(msg,res,1500,3000,'',() => {
          this.botMoving=false
          this.channel.send(text)
        })
      }else {//player has played
        this.channel.send(res)
        this.channel.send(text)
      }

    }else {//first run ranomize player
      this.gameStarted=true
      this.channel.send(res)
      this.th.think(msg,`${ico} ${this.who(this.turn)}`,1500,3000,`Es el torn de: `,callback)
    }

    return
  }

  load(msg){
    this.turn = Math.random()<0.5
    let res = `Començant partida de TicTacToe amb ${this.who(false)}`
    for (var i = 0; i < 9; i++) {
      if (i%3==0) {res+='\n'}
      res+=this.numbers[i+1]//🔳
    }
    res+="\nPer jugar utilitza **!play n** amb el numero de la casella\n"
    +"per deixar de jugar utilitza **!play quit**"
    this.channel.send(res)
    this.print(msg,() => {
      if (!this.turn&&this.botPlayer) {
        this.iMove()
      }
    })
  }

  who(turn){//true returns Aplayer false return Bplayer or BOT_NAME
    let mention = (a) => `<@${a}>`
    return turn? mention(this.playerA):(this.botPlayer?"**encarbasBOT**":mention(this.playerB))
  }

  move(tokens,msg=undefined){
    if(msg){
      let imA= msg.author.id == this.playerA //true->imA false->imB
      if(this.botMoving)return
      if(imA!=this.turn){
        this.channel.send(`Not your turn, let ${this.who(this.turn)} play his turn`)
        return false//game its not ended
      }
      if (tokens.length==0||isNaN(tokens[0])||tokens[0]>9||!this.freePos(tokens[0]-1)) {
        this.channel.send("invalid Try again")
        return false//game its not ended
      }
    }
    let pos = tokens[0]-1
    this.turn = !this.turn

    this.board = this.board.replace(/./g, (c, i) => i == pos ? (this.turn?'x':'o') : c);
    this.print(msg)

    let w = this.checkWin(true)
    if(!this.turn && this.botPlayer&&!w)this.iMove()
    return w
  }

  checkWin(checkForTie = false){
    let c = this.vectors
    for (var i = 0; i < c.length; i++) {
      if(this.board[c[i][0]]!='0' && this.board[c[i][1]]==this.board[c[i][0]] && this.board[c[i][2]]==this.board[c[i][0]])
        return 1
    }
    if (this.countFree()==0) return 2
    return 0
  }

  countFree(getPositions = false){
    let frees = []
    for (var i = 0; i < this.board.length; i++) {
      if (this.board[i]=='0')
        frees.push(i)
    }
    return getPositions?frees:frees.length
  }

  iMove(){
    this.botMoving = true
    let pos=-1,free = this.countFree(true)
    if (free.length<=7){//7=9-2 only two playn done
      for (var i = 0; i < this.vectors.length; i++) {
        let a = this.board[this.vectors[i][0]]
        let b = this.board[this.vectors[i][1]]
        let c = this.board[this.vectors[i][2]]
        let z = (a=="0")+(b=="0")+(c=="0")
        if(z==1){
          let x = (a=="x")+(b=="x")+(c=="x")
          let o = (a=="o")+(b=="o")+(c=="o")
          if (x==2) {//BOT
            pos = this.vectors[i][a=='0'?0:(b=='0'?1:2)]
            break
          }else if (o==2) {//PLAYER
            pos = this.vectors[i][a=='0'?0:(b==0?1:2)]
          }
        }

      }
    }
    if (pos==-1) {
      pos = this.th.random(free)
    }
    let kill = this.move([pos+1])
    if (kill) {
      this.quit()
      // this.th.games.quitMe(this.playerA)
    }
  }

  quit(){
    this.th.games.quitMe(this.playerA)
  }

}
