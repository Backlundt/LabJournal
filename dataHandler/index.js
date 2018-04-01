var config = require('../config');
var dataModel = require('./dataModel');
var db = require('mongoose');
db.connect(config.db)

var dataHandler  = function(){
}

dataHandler.prototype.dataset = db.model('dataset',dataModel.data);

dataHandler.prototype.results = db.model('results',dataModel.results);

dataHandler.prototype.note = db.model('note',dataModel.note);

dataHandler.prototype.queue = db.model('queue',dataModel.queue);

module.exports=dataHandler;
