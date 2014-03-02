var express = require('express')
  , http = require('http')
  , path = require('path');

var app = express();

//old diagnosis GET call - no pagination
// app.get('/diagnosis/:value', function(req, res) {
//       console.log(req.params.value);

//           res.header("Access-Control-Allow-Origin", "*");
//          res.header("Access-Control-Allow-Headers", "X-Requested-With");


//          doQuery({value:req.params.value,resource:'diagnosis' }, function(resultArray){
//       res.writeHead(200, {'content-type': 'text/json' });
//                 res.write(JSON.stringify(resultArray))
//  //     res.write(JSON.stringify());
//         res.end('\n')});
// });

//new diagnosis GET call with pagination
app.get('/songqueue', function (req, res) {
    console.log(req.query);

    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    
    getCurrentSongs(function(result, status) {
        res.writeHead(status, {
            'content-type': 'text/json'
        });
        res.write(JSON.stringify(result))
        res.end('\n')
        console.log(status);
    });

});

app.post('/songqueue', function(request, response){
    console.log(request.connection.remoteAddress);
    console.log(request.body.songs);
});

//in the html file we make the url for ajax at port 4000 that triggers an event at port 4000
app.listen(4000);
console.log('Listening on port 4000');

DATABASE_HOST = 'localhost';
DATABASE_NAME = 'u2be';

DATABASE_USERNAME = 'root';
DATABASE_PASSWORD = 'Hello123';

function getCurrentSongs(callback){
    var mysql     = require('mysql');
    var database  = DATABASE_NAME;
    var connection = mysql.createConnection({
        host     : DATABASE_HOST,
        user     : DATABASE_USERNAME,
        password : DATABASE_PASSWORD
    });
    var query = 'select url from songs where active=1';
    connection.connect();
    connection.query('use ' + database);

    connection.query(query, function(err, rows, fields) {
        console.log(arguments);
        if (err) {
            callback([new Object(err)], 500);
        } else {
            callback(new Object(rows), 200);
        }
    });
    connection.end();

}
