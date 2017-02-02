$(document).ready(function() {

  $('#newTaskForm').submit(function (e) {
    e.preventDefault();
    var title = $('#title').val();
    var dueDate = $('#dueDate').val();
    var status = $('#status').val();

    $.ajax({
      url: '/api/tasks',
      method: 'POST',
      data: {
        title: title,
        dueDate: dueDate,
        status: status
      }
    }).done(function (data) {
      console.log(data);
      window.location = "/";
    })
  });

  $('.update-btn').on('click', function () {
    var taskId = $(this).attr('id');
    var updateData = {title: $('#title').val(),
                      dueDate: $('#dueDate').val(),
                      status: $('#status').val()
                    };
    $.ajax({
      url: '/api/tasks/' + taskId,
      method: 'PUT',
      data: updateData
    }).done(function (data) {
      console.log(data);
      window.location = "/";
    });
  });

  $('.delete').on('click', function () {
    var taskId = $(this).attr('id');
    $.ajax({
      url: '/api/tasks/' + taskId,
      method: 'DELETE',
    }).done(function (data) {
      console.log(data)
      window.location = "/";
    });
  });

});
