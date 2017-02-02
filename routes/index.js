var express = require('express');
var router = express.Router();
var Task = require('../models/tasks');

router.use(function(req, res, next) {
  next();
});

router.route('/')
  .get(function(req, res) {
    Task.find(function(err, data) {
      if(err){
        console.log(err, "Error finding tasks");
      } else {
        // res.json(data);
        res.render('index', { title: 'To Do', tasks: data });
      }
    });
  })
  .post(function(req, res) {
    var task = new Task({
      title:    req.body.title,
      dueDate:  req.body.dueDate,
      status:   req.body.status
    });

    task.save(function(err, taskData) {
      if(err){
        console.log(err, "Error with task");
      } else {
        // res.json(taskData);
        Task.find(function(err, data) {
          if(err){
            console.log(err, "Error finding tasks");
          } else {
            // res.json(data);
            res.render('index', { title: 'To Do', tasks: data });
          }
        });
      }
    });
  })
  .delete(function(req, res) {
    Task.remove({ _id: req.params.taskId }, function(err, b){
      if(err){
        console.log(err, "COULD NOT DELETE BEAR");
      } else {
        res.json({ message: "BEAR DELETED" });
      }
    });
  });

module.exports = router;
