module.exports = async (client) => {
    const status = [
		'Abra um ticket e faça seu orçamento agora mesmo!✅',
	];
	i = 0;
	client.user.setActivity(status[0]);
	client.user.setStatus('online');
	console.log('✅ ' + client.user.username + ' started working!');
};