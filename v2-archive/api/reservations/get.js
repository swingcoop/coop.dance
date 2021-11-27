const axios = require('axios');
var Airtable = require('airtable');
var base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY })
	.base('apppi7CBP4i1rQmng');

module.exports = async function (req, res) {
	try {
        var val = [];
        // console.log(req.query); // { course: '12' }
        
        var query = { 
            view: "Grid view",
            fields: ["Role", "Class", "CourseId", "Status"]
        };

        if (req.query.course) {
            query.filterByFormula = "{CourseId} = '" + req.query.course + "'";
        }

        base('Current').select(query)
        .eachPage(function page(records, fetchNextPage) {
            records.forEach(function(record) {
                val.push(record.fields);
            });
        
            // To fetch the next page of records, call `fetchNextPage`.
            // If there are more records, `page` will get called again.
            // If there are no more records, `done` will get called.
            fetchNextPage();
        }, 
        function done(err) {
            if (err) { 
                console.log(err); 
                res.status(500).send('Error getting reservations');
                return; 
            }
            res.send(val);
        });
	}
	catch (err) {
		console.log(err);
		res.status(500).send('Error getting reservations');
	}
};