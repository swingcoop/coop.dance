const { json } = require('micro');

module.exports = async (req, res) => {
	const js = await json(req);
	console.log(js);
	return 'Ok';
}