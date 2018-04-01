var Schema =require('mongoose').Schema;

var dataModel = {};

dataModel.queue = {
  project:String,
  stage:String,
  files:{type:String},
  pending:{type:Boolean,default:true},
  done:Date,
  created: {type:Date,default:Date.now}
}

dataModel.data = {
  date:{type:Date, default: Date.now},
  author: String,
  description: String,
  parameters:[{type: Schema.Types.Mixed}],
  data: [{type:Schema.Types.Mixed}],
  files: [String],
  project: String
};

dataModel.results = {
  date:{type:Date, default: Date.now},
  dataSet:{ type: Schema.Types.ObjectId, ref: 'dataset' },
  files: [String],
  analysis:String,
  description: String

};

dataModel.note = {
  date:{type:Date, default: Date.now},
  text: String,
  project: String 
};
module.exports=dataModel
