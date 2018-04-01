var express = require('express'),
    app = express(),
    port = process.argv[2] || 80;
var bodyParser = require('body-parser');
var dataHandler = require('./dataHandler');
var ObjectId = require('mongoose').Types.ObjectId;
var fs = require('fs');
var config = require('./config');


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
// Static html hosting
//
//
app.use(express.static(__dirname + '/public'));
//app.use('/*', function(req, res){
  //res.sendfile(__dirname + '/public/index.html');
//});
app.set('view options', {
  layout: false
});
// Use body parser middleware
app.use(bodyParser.json());

//queries
app.post('/queryData',function(req,res){
 console.log("query")
 console.dir(req.body)
 db.dataset.find(req.body,function(err,dat){
     //console.dir(dat)
	if(!err)
   	   res.json(dat);
 	else
   	   res.send(err);
 })
});
//save data
app.post('/saveData',function(req,res){
  //console.dir("save data")
  //console.log(req.body);
  var data = new db.dataset(req.body);
  data.save(function(err){
    if(!err)
    	res.send(data._id);
    else
    	res.send(err)
  });
});

app.post('/saveNote',function(req,res){
  //console.dir("save note")
  //console.log(req.body);
  var data = new db.note(req.body);
  data.save(function(err){

    fs.writeFile(config.home+"params/"+req.body.project+"/notes."+data.date+".md", req.body.text, function(err) {
      if(err) {

        return console.log(err);
      }

      if(!err)
      res.send(data._id);
      else
      res.send(err)

    }); 

  });
});
app.post('/queryProjects',function(req,res){
 console.log("queryProjects");



  var o = {};

  o.map = function(){
    emit(this.project,this.date);
  };
  o.reduce = function(key,values){
    var sorted = values.sort();
    return sorted[0];
  };

  db.note.mapReduce(o,function(err,model,stats){

    model.find().exec(function(err,docs){
      console.log(docs)
    })

  });
app.post('/queryNote',function(req,res){
 //console.log("query");


 //console.dir(req.body);
 db.note.find(req.body).sort('date').exec(function(err,dat){
	if(!err)
   	   res.json(dat);
 	else
   	   res.send(err);
 });
});
app.post('/queryResult',function(req,res){
 //console.log("query");


 //console.dir(req.body);
 db.results.find(req.body).populate("dataSet").exec(function(err,dat){
	if(!err)
   	   res.json(dat);
 	else
   	   res.send(err);
 })
});
//save data
app.post('/saveResult',function(req,res){
  //console.dir("save result")
  //console.log(req.body);
  var result = new db.results(req.body);
  result.data = new ObjectId(req.body.data);
  result.save(function(err){
    if(!err)
    	res.send(result._id);
    else
    	res.send(err)
  });
});
queue = [];
app.post('/itemsInQueue',function(req,res){

  //console.log(req.body);
  //console.log(queue);
  //if(req.body.project in queue){

  db.queue.where({pending:true}).count(function(err,count){
    res.json(count);
  });
  
  //} 
  //else{
  
    //res.json(0)
  //}


  //res.json(sims[sims.length-1]);
  //sims.pop();

});
app.post('/addToQueue',function(req,res){

  console.log(req.body);


  if(req.body.project){

    var p = req.body.project;

    if(req.body.stage){

    var s = req.body.stage;
      if(req.body.paramFiles){
        var files =req.body.paramFiles;
        var newItem = new db.queue({project:p,stage:s,files:files,pending:true});
        newItem.save(function(err){

          console.log("accepted job");
          console.log(err);
          res.send("ok");
        });
      }
      else{
        res.send("no parameter files") ;
      }
    }
    else{
    
     
        res.send("no stage specified") ;
    }
  
  } 
  else{
  
    res.send("no project specified") ;
  }


  //res.json(sims[sims.length-1]);
  //sims.pop();

});
app.post('/nextSim',function(req,res){
  //console.log(req.body);


  if(req.body.project){

    var p = req.body.project;

    if(req.body.stage){

      var s = req.body.stage;

      db.queue.where({pending:true}).findOne({project:p,stage:s},function(err,item){
      
        if(item){
          item.pending = false;
          item.save(function(err){

            res.json(item);

          });
        }
        else res.json({});
      });


    }
    else{


      db.queue.where({pending:true}).findOne({project:p},function(err,item){
      
        if(item){
          item.pending = false;
          item.save(function(err){

            res.json(item);

          });
        }
        else res.json({});

      });
    
    }
  }
  else{

      db.queue.where({pending:true}).findOne({},function(err,item){
      
        if(item){
          item.pending = false;
          item.save(function(err){

            res.json(item);

          });
        }
        else{
          res.json({});
        }

      });
  }

});

