$(document).ready(function() {

  var updatingBear;

  $(".delete").on('click', function () {
    var bearId = $(this).attr('id').slice(4);
    console.log(bearId);
    $.ajax({
      url: '/api/bears/'+bearId,
      method: 'DELETE',
    }).done(function (data) {
      console.log(data);
      window.location = "/bears";
    });
  });

  $('#newBear').submit(function () {
    var name = $("#name").val();
    var species = $('#species').val();
    var age = $('#age').val();
    var weight = $('#weight').val();
    var location = $('#location').val();
    var attitude = $('#attitude').val();

    $.ajax({
      url: '/api/bears',
      method: 'POST',
      data: {
        name: name,
        species: species,
        age: age,
        weight: weight,
        location: location,
        attitude: attitude
      }
    }).done(function (data) {
      console.log(data);
      window.location = "/bears";
    })
  });

  $('.update').on('click', function () {
    var bearId = $(this).attr('id').slice(7);
    updatingBear = bearId;
    console.log(bearId);
    $.get('/api/bears/'+bearId).done(function (data) {
      console.log(data);
      $('#name').val(data.name);
      $('#age').val(data.age);
      $('#location').val(data.location);
      $('#attitude').val(data.attitude);
      $('#weight').val(data.weight);
      $('#species').val(data.species);
    });
  });

  $('#update-btn').on('click', function () {
    var updateData = {name: $('#name').val(),
                      age: $('#age').val(),
                      location: $('#location').val(),
                      attitude: $('#attitude').val(),
                      weight: $('#weight').val(),
                      species: $('#species').val()
                    };
    $.ajax({
      url: '/api/bears/' + updatingBear,
      method: 'PUT',
      data: updateData
    }).done(function (data) {
      console.log(data);
    });
  });

});
