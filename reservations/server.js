const { json } = require('micro');
const r2 = require('r2');

module.exports = async (req, res) => {
	const js = await json(req);
	console.log(js);

	// TODO: Send this out after replying to the client
	let zapierHook = 'https://hooks.zapier.com/hooks/catch/3680855/qy16ij/';
	let zapierResponse = await r2.post(zapierHook, { json: js }).json;
	console.log(zapierResponse);

	return 'Ok';
};