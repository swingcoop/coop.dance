const axios = require('axios');
var Airtable = require('airtable');
var base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY })
	.base('apppi7CBP4i1rQmng');

module.exports = async (ctx, next) => {
	var record = {
		"Name": ctx.body["name"],
		"Comments": ctx.body["comments"] || "",
		"Role": ctx.body["role"] || "Unknown",
		"Zip": ctx.body["zip"] || "",
		"Email": ctx.body["email"] || "",
		"Class": ctx.body["class"] || "",
		"Staff notes": ""
	};

	try {
		var records = await base('Current').create([{ fields: record }]);
		ctx.body = records;
	}
	catch (err) {
		ctx.throw(500, 'Error creating reservation', err);
	}
};