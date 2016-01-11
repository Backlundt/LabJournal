var config = require('../config');
var dataModel = require('./dataModel');
var db = require('mongoose');
db.connect(config.db)

var dataHandler  = function(){
}

dataHandler.prototype.dataset=db.model('dataset',dataModel.data);

dataHandler.prototype.results=db.model('results',dataModel.results);

module.exports=dataHandler;
