
var getArticles = $.get("/articles", function(data) {
  
  for (var i = 0; i < 10; i++) {
    $("#articles").prepend("<p data-id='" + data[i]._id + "'>" + data[i].title + "<br />" + data[i].link + "<br />" + data[i].summary + "</p>");
  }
})    
  .done(function() {
    console.log("second success connecting from /articles section in app.js");
  })
  .fail(function() {
    console.log("error in /articles section in app.js");
  })
  .always(function() {
    console.log("complete");
  });

$(document).on("click", "p", function() {

  $("#notes").empty();

  var thisId = $(this).attr("data-id");

  $.ajax({
    method: "GET",
    url: "/articles/" + thisId
  })
    
    .then(function(data) {
      console.log(data);
    
      $("#notes").append("<h2>" + data.title + "</h2>");
    
      $("#notes").append("<input id='titleinput' name='title' >");
    
      $("#notes").append("<textarea id='bodyinput' name='body'></textarea>");
    
      $("#notes").append("<button data-id='" + data._id + "' id='savenote'>Save Note</button>");

    
      if (data.note) {
    
        $("#titleinput").val(data.note.title);
    
        $("#bodyinput").val(data.note.body);
      }
    });
});


$(document).on("click", "#savenote", function() {

  var thisId = $(this).attr("data-id");

  $.ajax({
    method: "POST",
    url: "/articles/" + thisId,
    data: {

      title: $("#titleinput").val(),

      body: $("#bodyinput").val()
    }
  })

    .then(function(data) {

      console.log(data);

      $("#notes").empty();
    });

  $("#titleinput").val("");
  $("#bodyinput").val("");
});
