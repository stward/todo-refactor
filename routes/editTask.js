var express = require('express');
var router = express.Router();
var Task = require('../models/tasks');

router.use(function(req, res, next) {
  next();
});

router.route('/tasks')
  .get(function(req, res) {
    Task.find(function(err, data) {
      if(err){
        console.log(err, "Error finding tasks");
      } else {
        res.json(data);
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
        res.json(taskData);
      }
    });
  });

router.route('/tasks/:task_id')
  .get(function(req, res) {
    Task.findOne( req.params.task_id, function(err, taskData) {
      if(err){
        console.log(err, "Error finding one specific task");
      } else {
        res.json(taskData);
      }
    });
  })
  .put(function(req, res) {
    Task.findById( req.params.task_id, function(err, task) {
      if(err){
        console.log(err)
      } else {
        task.title = req.body.title ? req.body.title : task.title;
        task.dueDate = req.body.dueDate ? req.body.dueDate : task.dueDate;
        task.status = req.body.status ? req.body.status : task.status;

        task.save(function(e, updatedTask){
          if(e){
            console.log(e, "ERROR UPDATING TASK");
          } else {
            res.json(updatedTask);
          }
        });
      }
    });
  })
  .delete(function(req, res) {
    Task.remove({ _id: req.params.task_id }, function(err, b){
      if(err){
        console.log(err, "Error deleting task");
      } else {
        res.json({ message: "Task deleted" });
      }
    });
  });

module.exports = router;
