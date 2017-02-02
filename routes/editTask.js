var express = require('express');
var router = express.Router();
var Task = require('../models/tasks');

router.use(function(req, res, next) {
  next();
});

router.route('/tasks/:task_id')
  .get(function(req, res) {
    Task.findById( req.params.task_id, function(err, taskData) {
      if(err){
        console.log(err, "Error finding one specific task");
      } else {
        // res.json(taskData);
        res.render('tasks', {title: "Edit Task", task: taskData})
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

module.exports = router;
