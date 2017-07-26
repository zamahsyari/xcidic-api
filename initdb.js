var mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017');

var recordSchema={
	email:String,
	password:String,
	name:String,
	role:String,
	mrCode:String,
	weight:Number,
	height:Number,
	sistole:Number,
	diastole:Number,
	bloodType:String,
	bloodPressure:Number
};

var Record = mongoose.model('Medicalrecord',recordSchema);

module.exports = Record;