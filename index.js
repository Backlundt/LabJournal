var express = require('express'),
    app = express(),
    port = process.argv[2] || 80;
var bodyParser = require('body-parser');
var dataHandler = require('./dataHandler');

app.listen(port);
// Create database handle
var db = new dataHandler();

// Allow CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// Use body parser middleware
app.use(bodyParser.json());

//queries
app.post('/queryData',function(req,res){
 console.log("query")
 console.dir(req.body)
 db.dataset.find(req.body,function(err,dat){
	if(!err)
   	   res.json(dat);
 	else
   	   res.send(err);
 })
});
//save data
app.post('/saveData',function(req,res){
  console.dir("save data")
  console.log(req.body);
  var data = new db.dataset(req.body);
  data.save(function(err){
    if(!err)
    	res.send("ok");
    else
    	res.send(err)
  });
});


