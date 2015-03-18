var Schema =require('mongoose').Schema;

var dataModel = {};

  dataModel.data = {
    date:{type:Date, default: Date.now},
    author: String,
    parameters:[{type: Schema.Types.Mixed}],
    data: [{type:Schema.Types.Mixed}],
    files: [String],
    project: String
  }

  module.exports=dataModel
