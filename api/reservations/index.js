const { json } = require('micro');
const axios = require('axios');

module.exports = async (req, res) => {
	const js = await json(req);
	console.log(js);

	let zapierHook = 'https://hooks.zapier.com/hooks/catch/3680855/qy16ij/';
   let data = await axios.post(zapierHook, js);
   console.log(data);

   res.end("Ok");
	return "Ok"; // TODO: Not sure if we need this 
};