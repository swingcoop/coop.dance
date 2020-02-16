const axios = require('axios');
var Airtable = require('airtable');
var base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY })
	.base('app5u6Z6ERAecJasI');

var rsvpZapierUrl = 'https://hooks.zapier.com/hooks/catch/3680855/qy16ij/';

module.exports = async function (ctx) {
    var req = ctx.req;
    var res = ctx.res;

	var record = {
		"Name": req.body["name"],
		"Comments": req.body["comments"] || "",
		"Role": req.body["role"] || "Unknown",
        "Email": req.body["email"] || "",
        "Weekend Volunteer": req.body["volunteerWeekend"] || false,
        "Coop Volunteer Interest": req.body["volunteerCoop"] || false,
        "Saturday Workshops": req.body["saturdayWorkshops"] || false,
        "Saturday Dance": req.body["saturdayDance"] || false,
        "Sunday Workshops": req.body["sunday"] || false,
        "Likes Dancing": req.body["human"] || false,
		"Staff notes": ""
	};

	var zapierPackage = {
		name: record["Name"],
		comments: record["Comments"],
		role: record["Role"],
		email: record["Email"],
		course: req.body["event"]
	};

	try {
		var records = await base('Current').create([{ fields: record }]);
		await axios.post(rsvpZapierUrl, zapierPackage);
		res.status(200).send(records.fields);
	}
	catch (err) {
		console.log(err);
		res.status(500).send('Error creating reservation');
	}
};