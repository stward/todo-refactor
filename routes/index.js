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
        console.log(data);
        res.render('index', { title: 'To Do', tasks: data });
      }
    });
  })

module.exports = router;
