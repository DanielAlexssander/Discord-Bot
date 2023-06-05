module.exports = async (client) => {
    const status = [
		'Abra um ticket e faça seu orçamento agora mesmo!✅',
	];
	i = 0;
	client.user.setActivity(status[0]);
	setInterval(function () {
		client.user.setActivity(status[0]);
	}, 1 * 10000);
	client.user.setStatus('online');
	console.log('✅ ' + client.user.username + ' started working!');
	client.user.setPresence({
		status: "online",
	  });
};