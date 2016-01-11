var express = require('express'),
    app = express(),
    port = process.argv[2] || 80;
var bodyParser = require('body-parser');
var dataHandler = require('./dataHandler');
var ObjectId = require('mongoose').Types.ObjectId;

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

app.get('/getAll',function(req,res){
 db.dataset.find({},function(err,dat){
	if(!err)
   	   res.json(dat);
 	else
   	   res.send(err);
 })
});
//queries
app.post('/queryData',function(req,res){
 console.log("query")
 console.dir(req.body)
 db.dataset.find(req.body,function(err,dat){
   	console.dir(dat)
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
    	res.send(data._id);
    else
    	res.send(err)
  });
});


app.post('/queryResult',function(req,res){
 console.log("query");


 console.dir(req.body);
 db.results.find(req.body).populate("dataSet").exec(function(err,dat){
	if(!err)
   	   res.json(dat);
 	else
   	   res.send(err);
 })
});
//save data
app.post('/saveResult',function(req,res){
  console.dir("save result")
  console.log(req.body);
  var result = new db.results(req.body);
  result.data = new ObjectId(req.body.data);
  result.save(function(err){
    if(!err)
    	res.send(result._id);
    else
    	res.send(err)
  });
});
