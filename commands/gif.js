/*
https://api.tenor.com/ tiene una API gratuita de GIFS
*/

const GIF_FILTER=["off","low","medium","high"]//filtro familly friendry

module.exports = async (th,msg,tokens) => {
  let url = `https://api.tenor.com/v1/search?q=${tokens.join(' ')}`
  +`&key=${th.process.env.TENOR_KEY}`
  +`&ContentFilter=${GIF_FILTER[0]}`// 0 = sin filtro
                                    // 3 = familly friendry

  let response = await th.fetch(url)//espera la respuesta de la api
  let json = await response.json()//convierte la respuesta a json
  const index = th.random(json.results.length)//de todas las coincidencias de busqueda escoje una aleatoria
  msg.channel.send(json.results[index].url)//envia la URL por el chat y DISCORD lo convierte a gif

}
