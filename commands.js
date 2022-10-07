/////////////////// TODO:
//DICE and COIN

const commands ={
    "gif": {type:"module",func:require('./commands/gif.js')    ,info:"usalo sin parametros para una busqueda random, o escribe palabras clave para hacer una busqueda"},
  "8ball": {type:"module",func:require('./commands/8ball.js')  ,info:"usalo sin parametros para una respuesta simple, o escribe tu pregunta y la mostrará con la respuesta"},
   "calc": {type:"module",func:require('./commands/calc.js')   ,info:"introduce una operacion matematica de cualquier tipo"},
   //"play": {type:"module",func:require('./commands/play.js')   ,info:"juegos"},
   "poll": {type:"module",func:require('./commands/poll.js')   ,info:"crea una enquesta para botar entre los usuarios\n *tu pregunta?* **;** *opcion 1* **;** *opcion 2* ..."},
   "vote": {type:"module",func:require('./commands/vote.js')   ,info:"Simplemente anade 👍, 👎 al mensaje del autor, acompañalo con texto si quieres"},
  "throw": {type:"module",func:require('./commands/throw.js')  ,info:"**!throw** or **!throw dice** to throw a dice\n"+
                    "**!throw coin** to throw a coin\n"+
                    "**!throw** *option A* **;** *option B* **;** *option C...* to choose an option\n"+
                    "**!throw** ***number*** to choose a number between 0 and ***number*** *(both included)*\n"+
                    "**!throw** ***numberA numberB*** to choose a nomber between both  *(both included)*"
    },
   "hot":  {type:"module",func:require('./commands/hot.js')    ,info:":underage: :underage: "},

  "test":{type:"function",func:async (th,msg,tokens)=>{
    let nmsg = await msg.channel.send("puto")
    setTimeout(() => {nmsg.edit('i mean...');
      setTimeout(() => {nmsg.edit('Beep Boop!');}, 400);
    }, 200);
  },info:"Test command, nada sospechoso 🤔"},

  "think":{type:"function",func:(th,msg,tokens)=>{
    th.think(msg,"not much to say 🤔",3000,6000)
  },info:"otro comando de test"},

  "clear":{type:"function",func:(th,msg,tokens)=>{
    msg.channel.send("clearing...."+'\n'.repeat(40)+'.')
  },info:"Correee !!! que viene la mama"},

  "echo":{type:"function",func:(th,msg,tokens)=>{
    msg.channel.send(th.str2emoji(tokens.join(' ')))
  },info:"Introduce un texto y se muestra bien grandote\n **!echo gamba**"},

  "help":{type:"function",func:(th,msg,tokens)=>{
    msg.channel.send(askHelp(th))
  },info:"HELPCEPTION"},

  
}

function askHelp(th){
  return Object.keys(commands).map(x=>
    "**"+th.conf.simb+x+"**\n"
    +(
      commands[x].hasOwnProperty("info")
      ?commands[x].info+"\n"
      :""
    )
  ).join("\n")
}


module.exports.message=async (msg,th) => {

  let tokens = msg.content.split(' ')
  let command = tokens.shift()

  if (command.charAt(0)==th.conf.simb){//its a comand
    command = command.substr(1).toLowerCase()


    if (commands[command]) {//comando en la lista de comandos
      commands[command].func(th,msg,tokens)//lo ejecuta

    }else {
      const options = Object.keys(commands)
        .map(x=>[x,th.levenshteinDistance(command,x)])
        .filter(x=>x[0].length-x[1]>0)
        .sort((a,b)=>a[1]-b[1])
        if(options.length==0){

        }else if(options.length==1){
          msg.channel.send(`Creo que el comando que estas buscando es **${th.conf.simb}${options[0][0]}**`)
        }else{
          msg.channel.send(`No entiendo el comando **${command}** por el momento\n`
            +`Estas seguro que no querias decir uno de estos?`
            +options.map(x=>`\n**${th.conf.simb}${x[0]}** ${Math.round((1-x[1]/x[0].length)*10000)/100}%`).join('')
          )
        }
    }

      

  }//its a command
  
}


// module.exports.react= (msg,th) => {
//   console.log(msg);
// }
