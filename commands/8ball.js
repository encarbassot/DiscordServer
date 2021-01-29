// const EIGHT_BALL=["És cert", "Decididament és així", "Sens dubte", "Sí, definitivament",//CATALA
//                 "Pots confiar-hi", "Tal com ho veig, sí", "Més probable", "Bones perspectives",
//                 "Sí", "Els signes indiquen que sí", "Resposta borrosa , torna-ho a provar", "Pregunteu-ho més tard",
//                 "És millor no dir-ho ara", "No es pot predir ara", "Concentra't i torna a preguntar",
//                 "No compti amb això", "La meva resposta és no", "Les meves fonts diuen que no", "Perspectives no tan bones", "Molt dubtós"]
//
// const EIGHT_BALL = [ "It is certain", "It is decidedly so", "Without a doubt", "Yes, definitely",//ENGLISH
//                "You may rely on it", "As I see it, yes", "Most Likely", "Outlook Good",
//                "Yes", "Signs point to yes", "Reply hazy, try again", "Ask again later",
//                "Better not tell you now", "Cannot predict now", "Concentrate and ask again",
//                "Don't count on it", "My reply is no", "My sources say no", "Outlook not so good", "Very Doubtful"]

const EIGHT_BALL = ["Es cierto", "Definitivamente es así", "Sin duda", "Sí, definitivamente",//ESPANOL
                "Puede confiar en ello", "Tal como yo lo veo, sí", "Es probable", "Buenas perspectivas",
                "Sí", "Las señales que indican sí", "Respuesta confusa, inténtalo de nuevo", "Preguntar de nuevo más tarde",
                "Mejor no te lo diga ahora", "No puedo predecir ahora", "Concéntrate y pregunta de nuevo",
                "No cuente con eso", "Mi respuesta es NO", "Mis fuentes dicen que no", "Perspectivas no tan buenas", "Muy dudoso"]

module.exports = (th,msg,arg) => {
  if (arg.length>0) {// si se formula una pregunta en el mensaje responde:
    // @AUTHOR asks:     question
    // 8-BALL says:     response
    msg.channel.send('***@'+msg.author.username.toUpperCase()+"*** asks: \t"+arg.join(' ')+'\n***8-BALL*** says: \t'+EIGHT_BALL[th.random(EIGHT_BALL.length)])
  }else{//si no se formula pregunta responde simplemente
    msg.channel.send(EIGHT_BALL[th.random(EIGHT_BALL.length)])
  }
}
