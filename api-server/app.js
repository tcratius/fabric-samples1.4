var express = require('express');
var bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.json());

// Send for taskList and return
var taskList = [];
app.get('/list', function(req,res){
  res.send(taskList);
});

// Post a new task to taskList
app.post('/task', function(req,res){
  taskList.push(req.body.task);
  res.send(taskList);
});

// To change a task by task index.  The task index is specified
// in the URI. The new task is written in the body as a JSON
// file with key = "task". The updated taskList is returned.
app.put('/task/:task_index', function(req,res){
  var taskIndex = req.params.task_index;
  taskList[taskIndex] = req.body.task;
  res.send(taskList);
});

app.listen(8080);
