var Schema =require('mongoose').Schema;

var dataModel = {};

  dataModel.data = {
    date:{type:Date, default: Date.now},
    author: String,
    description: String,
    parameters:[{type: Schema.Types.Mixed}],
    data: [{type:Schema.Types.Mixed}],
    files: [String],
    project: String
  }

  dataModel.results = {
    date:{type:Date, default: Date.now},
    dataSet:{ type: Schema.Types.ObjectId, ref: 'dataset' },
    files: [String],
    analysis:String,
    description: String

  }

  dataModel.note = {
    date:{type:Date, default: Date.now},
    text: String,
    project: String 
  }
  module.exports=dataModel
