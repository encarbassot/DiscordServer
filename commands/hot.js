const fetch = require('node-fetch')//necesario para el comando gif

// WARNING +18 CONTENT
//❌♻️🔃#️⃣
let emoCancel = '❌'
let emoReload = '🔃'
let emoMore = '#️⃣'
let emoFire = '🔥'
let category = ["tits","pussy","ass","missionary","‍cowgirl","doggy style","blowjob","cumshots"]
let emocategory = ["🍐","🌮","🍑","👩","🧎","🐕","🍆","💦"]

module.exports = async (th,msg,tokens) => {
  let chan = msg.channel
  // chan.send("this channel is "+(chan.nsfw?"":"NOT ")+"NSFW")
  if (tokens.length>0) {//if user send petition
    let i = category.indexOf(tokens[0])
    if(i>=0){//if its in lisst
      newGif(th,chan,tokens,"index.php?k="+category[i].replace(" ","20%"))
    }else {//else try with emoji
      let j = emocategory.indexOf(tokens[0])
      if(j>=0){
        newGif(th,chan,tokens,"index.php?k="+category[j].replace(" ","20%"))
      }else{//else show menu
        newDemoGif(th,chan,tokens)
      }
    }
  }else{//no user petition, send anyone
    newGif(th,chan,tokens)
  }
}


async function newGif(th,chan,tokens,urladon=""){//send a gif
  console.log(chan.nsfw,chan.type)
  if(!chan.nsfw&&chan.type!="dm"){
    let nmsg = await chan.send("this command only worws for NSFW chats")
    nmsg.react("🔞")
    return
  }
  try{
    let url = "http://porngif.top/"//search == ""?"https://www.sex.com/gifs/":('https://www.sex.com/search/gifs?query='+search)
    let response = await fetch(url+urladon)
    let body = await response.text()

    let nmsg = await chan.send(url+fetchUrl(body))
    //setTimeout(()=> {nmsg.edit('🥵')},10000)//after 10 seconds hide the gif
    nmsg.react(emoCancel)
    nmsg.react(emoReload)
    nmsg.react(emoMore)

  const filter = (reaction, user) => {return user.id != th.myId};
  nmsg.awaitReactions(filter, { max:1, time: 60000, errors: ['time'] })//al seleccionar un juego por emoji
    .then(collected => {
      const reaction = collected.first()
      if (reaction.emoji.name == emoCancel) {
        nmsg.delete()
      }else if(reaction.emoji.name == emoReload){
        nmsg.delete()
        newGif(th,chan,tokens,urladon)
      }else if(reaction.emoji.name == emoMore){
        nmsg.delete()
        newDemoGif(th,chan,tokens)
      }
    })//fix that catch
  }catch(e){}
}

async function newDemoGif(th,chan,tokens){
  //http://porngif.top/index.php?k=puss

  let txt=emoFire+" anyone\n"
  for (var i = 0; i < category.length; i++) {
    txt += emocategory[i]+ " "+category[i]+"\n"
  }
  try{
    let nmsg = await chan.send(txt)
    nmsg.react(emoCancel)
    nmsg.react(emoFire)
    for (var i = 0; i < emocategory.length; i++) {
      nmsg.react(emocategory[i])
    }

    const filter = (reaction, user) => {return user.id != th.myId};
    nmsg.awaitReactions(filter, { max:1, time: 60000, errors: ['time'] })//al seleccionar un juego por emoji
      .then(collected => {
        const reaction = collected.first()
        if (reaction.emoji.name == emoCancel) {
          nmsg.delete()
        }else if(reaction.emoji.name == emoFire){
          nmsg.delete()
          newGif(th,chan,tokens)
        }else{
          let i = emocategory.indexOf(reaction.emoji.name)
          nmsg.delete()
          newGif(th,chan,tokens,"index.php?k="+category[i].replace(" ","20%"))
        }
      })
    }catch(e){}
}


function fetchUrl(str){
  var regex = /\.gif/gi, result, indices = [];
  while ( (result = regex.exec(str)) ) {
      indices.push(result.index);
  }
  let scramb = indices.sort((a, b) => 0.5 - Math.random());
  for(let i=0; i<scramb.length&&i<1;i++){
      let a =(findCharPrev(str,scramb[i],'"',-1))
      let b =(findCharPrev(str,scramb[i],'"', 1))
      return str.substring(a+1,b).replace(' ','%20')
  }
}


function findCharPrev(str,indexFrom,char,dir=-1){
    let i = 1
    let max = 200
    let actch = str.charAt(indexFrom + i*dir)
    while(actch != char && i<max){
        i++;
        actch = str.charAt(indexFrom+i*dir)
    }
    return indexFrom+i*dir

}
