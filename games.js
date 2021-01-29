/*
Esta clase es la encargada de almacenar partidas que se estan jugando en el momento
ademas de ser la encargada de destruirlas al ser finalizadas

es ejecutada por ./commands/play.js
y es almacenada en ./index.js en la variable th que se manda a todos los archivos
th.games

TODO:
poner limite de tiempo, si la partida ha sido creada hace mas de 1h eliminarla

*/

module.exports.games = class Games{
  constructor(t){
    this.currentGames = []
  }
  push(g){
    g.timestamp = Date.now()
    this.currentGames.push(g)
    // console.log(this.currentGames);
  }
  imPlaying(id){
    for (var i = 0; i < this.currentGames.length; i++) {
      //if(this.currentGames[i].playerA==id || this.currentGames[i].playerB==id)return this.currentGames[i]
      if (this.currentGames[i].imPlaying(id)){
        return this.currentGames[i]
      }
    }
    return false
  }
  quitMe(id){
    for (var i = 0; i < this.currentGames.length; i++) {
      if (this.currentGames[i].imPlaying(this.me)){
        this.currentGames.splice(i,1)
        return true
      }
    }
    return false
  }
}
