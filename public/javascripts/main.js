$(document).ready(function() {

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
      url: '/' + taskId,
      method: 'DELETE',
    }).done(function (data) {
      console.log(data);
      window.location = "/";
    });
  });

});
