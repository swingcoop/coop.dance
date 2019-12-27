const axios = require('axios');
var Airtable = require('airtable');
var base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY })
	.base('apppi7CBP4i1rQmng');

var rsvpZapierUrl = 'https://hooks.zapier.com/hooks/catch/3680855/qy16ij/';

module.exports = async function (req, res) {
	var record = {
		"Name": req.body["name"],
		"Comments": req.body["comments"] || "",
		"Role": req.body["role"] || "Unknown",
		"Zip": req.body["zip"] || "",
		"Email": req.body["email"] || "",
		"Class": req.body["class"] || "",
		"Staff notes": ""
	};

	var zapierPackage = {
		name: record["Name"],
		comments: record["Comments"],
		role: record["Role"],
		email: record["Email"],
		course: record["Class"]
	};

	try {
		var records = await base('Current').create([{ fields: record }]);
		await axios.post(rsvpZapierUrl, zapierPackage);
		res.send(records.fields);
	}
	catch (err) {
		console.log(err);
		res.status(500).send('Error creating reservation');
	}
};