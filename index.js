const config = require('./config')
var login = require('facebook-chat-api');
const simsimi = require('simsimi')({
	key: config.KEY,
	api: 'http://sandbox.api.simsimi.com/request.p',
	lc: 'vn',
	ft: '1.0'
});

login({
	email: config.EMAIL,
	password: config.PASSWORD
},
(err, api) => {
	if (err) return console.error(err);
	api.listen(function callback(err, message) {
		if (message.type === 'message') {
			simsimi(message.body)
				.then(response => {
					api.sendMessage(`BOT: ${response}`, message.threadID);
					console.log(message.body);
					console.log(`BOT: ${response}`);
					api.markAsRead(message.threadID);
				})
				.catch(err => {
					api.sendMessage(
						'BOT: Tao đang đơ, không trả lời được :)',
						message.threadID
					);
					console.log(err);
				});
		} else {
			api.sendMessage(
				'BOT: Tao đang đơ, không trả lời được :)',
				message.threadID
			);
			console.log(err);
		}
	});
}
);