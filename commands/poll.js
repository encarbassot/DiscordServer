module.exports=async (th,msg,tokens) => {
  let options = tokens.join(' ').split(';')
  let question = options.shift()

  let numbers =['1️⃣','2️⃣','3️⃣','4️⃣','5️⃣','6️⃣','7️⃣','8️⃣','9️⃣','🔟']

  let result =question

  if (options.length < 2) {//bad format question
    msg.channel.send('To make a poll you should use:\n **!poll** *Your question here?* **;** *option 1* **;** *option 2* **;**...')
    return
  }else if(options.length>numbers.length){//too long question
    msg.channel.send(`Maximum of ${numbers.length} options, you asked for ${options.length}`)
    return
  }

    for (var i = 0; i < options.length; i++) {
      result+='\n'+numbers[i]+' '+options[i]
    }
    let nmsg = await msg.channel.send(result)

    for (var i = 0; i < options.length; i++) {
      nmsg.react(numbers[i])
    }

    // const filter = (reaction, user) => {
    // 	return numbers.includes(reaction.emoji.name)// && user.id === message.author.id;
    // };
    // nmsg.awaitReactions(filter,{ max: 1, time: 60000, errors: ['time'] }).then(collected => {
    //   console.log(numbers.indexOf(reaction.emoji.name));
    // })


}
