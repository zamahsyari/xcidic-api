const express = require('express')
const circularJson = require('circular-json')
const app = express()
var Record = require('./initdb');
var bodyParser = require('body-parser');

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
})
app.use(bodyParser.json()); 

app.get('/', function (req, res) {
  res.send('React API powered by Express')
})

app.get('/all',function(req,res){
	Record.find({},function(err,data){
		var dataMap = {};
		data.forEach(function(user){
			dataMap[user._id] = user;
		});
		res.send(dataMap);
	});
})

app.post('/add',function(req,res){
	var request=req.body;
	// var request={'name':'budi','email':'budi@gmail.com'};
	var data=new Record(request)
	data.save(function (err) {
		if (err) {
			res.send(err)
		} else {
			res.send("SUCCESSFULLY ADDED")
		}
	});	
})

app.post('/update/:email',function(req,res){
	Record.update(req.params,req.body,function(err, data){
		if (err) {
			res.send(err)
		} else {
			res.send("SUCCESSFULLY UPDATED")
		}
	})
});

app.get('/delete/:email',function(req,res){
	var criteria={
		email:req.params
	};
	Record.remove(criteria,function(err, data){
		if (err) {
			res.send(err)
		} else {
			res.send("SUCCESSFULLY DELETED")
		}
	})
});

app.get('/find/:email',function(req,res){
	Record.findOne({email:req.params},function(err, data){
		if (err) {
			res.send(err)
		} else {
			res.send(data);
		}
	});
})

app.listen(8080)