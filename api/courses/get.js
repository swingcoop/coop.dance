var Airtable = require('airtable');
var courses = 'appUzML2aPlDHWcFi';

const base = Airtable.base(courses);

function get() {
    return new Promise(function (resolve, reject) {
        var courses = [];

        base('Course Descriptions')
        .select({ view: "Website View" })
        .eachPage(page, done);

        function page(records, next) {
            let requests = records.map(record => {
                return new Promise((loaded) => {
                    var course = record.fields;

                    var venueArray = record.get("Venue")
                    var venueId = venueArray && venueArray.length && venueArray.pop();
    
                    base('Venues').find(venueId, function(err, venueRecord) {
                        if (err) { 
                            return reject(err); 
                        }
                        console.log(venueRecord);
                        course["Venue"] = venueRecord.fields;
                        courses.push(course);
                        loaded();
                    });
                });
            });

            Promise.all(requests).then(next);
        }

        function done(err) {
            return err ? reject(err) : resolve(courses);
        }
    });
}

module.exports = async (req, res) => {
    try {
        var val = await get();
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(val));
    }
    catch (err) {
        console.log(err);
        res.statusCode = 500;
        res.end();
    }
    return;
};