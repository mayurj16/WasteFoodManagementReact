var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
mongoose.connect('mongodb://localhost/test');
var app = express();
// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
//  Parse Application/JSON
var port = process.env.port || 8003;

var router = express.Router(); // Instance of Express Router

router.route('/test')
    .post(function(req, res) {
        var msg = null;
        var ssb = new SSB(req.body);
        ssb.save(function(err) {
            if (err) {
                res.json({ 'Status': 400 });
                console.log('Error in POST:', err);
            } else {
                msg = ssb.name + ' Created';
                res.json({ message: msg, 'Status': 201 });
                console.log(req.method, req.originalUrl);
            }
        })
    })
    // GET API 
    .get(function(req, res) {
        SSB.find(function(err, ssb) {
            if (err) {
                res.json({ 'Status': 404 });
                console.log('Err in GET', err);
            } else {
                res.json({ ssb, 'Status': 200 });
                console.log(req.method, req.originalUrl);
            }
        })
    });
app.use('/api', router);
app.listen(port);
console.log('Server running on ', port);