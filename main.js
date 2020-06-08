const { spawn } = require('child_process')
const express = require('express')
const app = express()
let {PythonShell} = require('python-shell')

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "YOUR-DOMAIN.TLD"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

const bodyParser = require("body-parser");

/** bodyParser.urlencoded(options)
 * Parses the text as URL encoded data (which is how browsers tend to send form data from regular forms set to POST)
 * and exposes the resulting object (containing the keys and values) on req.body
 */
app.use(bodyParser.urlencoded({
    extended: true
}));

/**bodyParser.json(options)
 * Parses the text as JSON and exposes the resulting object on req.body.
 */
app.use(bodyParser.json());

app.get('/', (req, res) => res.send('Hello World!'))

// app.listen(3000, function () {
  // console.log('Example app listening on port 3000!')
// })


app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.listen(process.env.PORT)
var fs = require('fs');

app.post('/predict', function(req,res){
	//console.log(req.body.price);
	
let pyshell = new PythonShell('MLCode/demo.py'); 

// sends a message to the Python script via stdin
pyshell.send([req.body.price, req.body.type, req.body.year]);

  console.log("inside the MLCode");
  
  var fs = require('fs');
  var contents = fs.readFileSync('testfile.txt', 'utf8');
  console.log(contents);
  res.write(contents);
  
  res.end();
 
// end the input stream and allow the process to exit
pyshell.end(function (err,code,signal) {
  if (err) throw err;
  console.log('The exit code was: ' + code);
  console.log('The exit signal was: ' + signal);
  console.log('finished');
});

});