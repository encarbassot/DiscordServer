module.exports=(th,msg,tokens) => {
  let opr = tokens.join(' ')
  try {// la funcion eval convierte un str matematico a la solucion
    msg.channel.send(opr+' = ' +eval(opr))
  } catch (e) {//MATH ERROR
      if (e instanceof SyntaxError) {
        msg.channel.send(opr+'\n'+e.message)
      }
  }
}
