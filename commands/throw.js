module.exports=async (th,msg,tokens) => {
  let numbers =th.emoji.numbers.slice(1,7)// ['1️⃣','2️⃣','3️⃣','4️⃣','5️⃣','6️⃣']
  let coin = 'https://i.pinimg.com/originals/d7/49/06/d74906d39a1964e7d07555e7601b06ad.gif'
  if(isNaN(tokens[0])){//si no es un numero
    if (tokens.length == 0 || tokens[0]=="dice") {//dice "dice" o no existe
      th.think(msg,th.random(numbers),3000,1500)//TIRA UN DADO
    }else if(tokens[0]=="coin") {//dice coin
      let nmsg = await msg.channel.send(coin)//envia un gif de una moneda girando
      setTimeout(() => {
        //envia un gif de moneda CARA o un gif de moneda CRUZ
        nmsg.edit(th.random(["HEADS\nhttps://media1.tenor.com/images/26ceb9ab4b5b070f7b0257f8f4e0c80f/tenor.gif"
        ,'TAILS\nhttps://media.tenor.com/images/3f1aa6550335c20338817bd19a3b5806/tenor.gif']));
      },1500)
    }else{//NO dice ni coin ni dice
      randomToken(th,tokens,msg)
    }
  }else if(tokens.length<=2){//its a number
    if(tokens.length == 1||!isNaN(tokens[1])){// y no tiene 2do parametro o si lo tiene es un numero
      let n = th.random(tokens[0],(parseInt(tokens[1])+1)||0)
      th.think(msg,th.str2emoji(n.toString()),3000,1500)
    }else {//no son numeros
      randomToken(th,tokens,msg)
    }
  }else {
    randomToken(th,tokens,msg)
  }
}


function randomToken(th,tokens,msg){
  let newTokens = tokens.join(' ').split(';')
  if (newTokens.length>1) {//escoje una opcion
    th.think(msg,th.random(newTokens),3000,1500)
  }else{//recuerda las opciones
    msg.channel.send("try with:\n"+
    "**!throw** or **!throw dice** to throw a dice\n"+
    "**!throw coin** to throw a coin\n"+
    "**!throw** *option A* **;** *option B* **;** *option C...* to choose an option\n"+
    "**!throw** ***number*** to choose a number between 0 and ***number*** *(both included)*\n"+
    "**!throw** ***numberA numberB*** to choose a nomber between both  *(both included)*")

  }
}
