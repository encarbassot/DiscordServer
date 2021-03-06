module.exports = class Through {
  constructor(modules,gameHandler) {
    this.games = new gameHandler.games()
    this.currentGames = []

    let strModules = Object.keys(modules)
    for (var i = 0; i < strModules.length; i++) {
      this[strModules[i]]=modules[strModules[i]]
    }
    this.myId = 800126680428707851
    this.emoji = {
      numbers:['0️⃣','1️⃣','2️⃣','3️⃣','4️⃣','5️⃣','6️⃣','7️⃣','8️⃣','9️⃣','🔟']
    }
    this.conf={
      simb:'!'
    }
  }
  random(a,b = 0){
    if (Array.isArray(a)) {//si es un array retorna un elemento aleatorio
      return a[Math.floor(Math.random() * a.length)]
    }

    // sino retorna un numero aleatorio entre <a> y 0 o [b] si esta especificada
    let min = Math.min(a,b)
    let max = Math.max(a,b)
    return Math.floor(min+Math.random()*(max-min))
  }

  emojiChar(a){
    let b = a.toLowerCase()
    return (b >= 'a' &&  b <= 'z') ?`:regional_indicator_${b}:`: a
  }
  str2emoji(s){
    for (var i = 0; i < this.emoji.numbers.length-1; i++) {//NUMBERS
      let replacer = new RegExp(i, 'g')
      s=s.replace(replacer,this.emoji.numbers[i])
    }

    let t = s.split('')
    for (var i = 0; i < t.length; i++) {//LETTERS
      t[i]=this.emojiChar(t[i])
    }
    return t.join('')
  }

getUserFromMention(mention) {//mention for discord to id
	if (!mention) return;
	if (mention.startsWith('<@') && mention.endsWith('>')) {
		mention = mention.slice(2, -1);
		if (mention.startsWith('!')) {
			mention = mention.slice(1);
		}
		return this.client.users.cache.get(mention);
	}
}

async think(msg,text,a,b=0,pretext="",callback=undefined){//animacion de [...]
  //through.think(msg,"not much to say",3000,6000,'pretext',callback)

  let thinkTime = 600
  let minTime = Math.min(a,b)
  let maxTime = Math.max(a,b)
  let runs = Math.floor(this.random(minTime,maxTime)/thinkTime)

  let req = (i) => {
    setTimeout(() => {
      if (i>0){
        req(--i)
        nmsg.edit(pretext+'.'.repeat(i%3+1))
      }else{
        nmsg.edit(pretext + text).then(callback)
        // if (callback) {
        //   callback()
        // }
      }
    }, thinkTime);
  }

  let nmsg = await msg.channel.send(pretext||'...')
  req(runs)
}
}//THROUGH
