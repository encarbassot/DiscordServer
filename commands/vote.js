/*
Simplemente anade '👍', '👎' al mensaje del autor
*/

module.exports=(th,msg,tokens) => {
  msg.react('👍').then(() => msg.react('👎'));

const filter = (reaction, user) => {
	return ['👍', '👎'].includes(reaction.emoji.name) &&user.id != th.myId
};
}
