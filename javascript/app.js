// array with animal names

var animals = [
  "rabbit",
  "dog",
  "cat",
  "hamster",
  "ferret",
  "goldfish",
  "turtle",
  "lion",
  "zebra",
  "elephant",
  "tiger",
  "hedgehog",
  "chicken",
  "snake",
  "frog",
  "monkey"
];

// function to create button for each animal from array
var animalBtnSection = $("<div id='animalSelection'>");

animals.forEach(function(element) {
  var btn = $("<button class='animalName btn btn-info m-1'>");
  btn.text(element);
  btn.attr("name", element);
  $(".container-fluid").append(animalBtnSection.append(btn));
});
// creating row and columns to section API and add buttons
var rowSec = $("<div class='row'>");
var apiSec = $("<div class= 'col-sm-8'>");
var formSec = $("<div class = 'col-sm-4'>");
rowSec.append(apiSec, formSec);
$(".container-fluid").append(rowSec);

// creating user input div
var formDiv = $("<div id= 'formSection' class='float-right m-4' >");
var inputForm = $("<form class= 'form'>");
var divInsideForm = $("<div class='form-group'>");
var submitBtn = $("<button id= 'submit' class='btn btn-info my-2'>");
submitBtn.text("Submit");
divInsideForm.append(
  $(
    "<input type='text' name= 'userFeed' id= 'userInput' class= 'form-control' style='width:400px'>"
  ),
  submitBtn
);
inputForm.append(divInsideForm);
formDiv.append($("<h5 class ='text-dark'>Add an animal</h5>"), inputForm);
formSec.append(formDiv);

// get user input and add button to animal button section
$("#submit").click(function(e) {
  e.preventDefault();

  var userInput = $("#userInput").val();
  var btnFromUserInput = $("<button class='animalName btn btn-info m-1'>");
  if (userInput.match(/[a-z]/i)) {
    if (!animals.includes(userInput.toLowerCase())) {
      btnFromUserInput.text(userInput);
      btnFromUserInput.attr("name", userInput);
      animalBtnSection.append(btnFromUserInput);
      $("input").val("");
    } else {
      alert(userInput + " is already added!");
      $("input").val("");
    }
  } else {
    alert(
      "Input field is empty or invalid key entered! Enter alphabetic letters only."
    );
  }
});
var resultDiv = $("<section class='result'>");

// get api
animalBtnSection.on("click", ".animalName", function(e) {
  e.preventDefault();
  $(".result").empty();
  var animalNameFromBtnClick = $(this).attr("name");
  console.log("clicked Animal: " + animalNameFromBtnClick);
  var apiKey = "Jc2Gco8Y1Fbo3gdJ3WLjitNtP5Q3Mz4I";
  var queryUrl =
    "https://api.giphy.com/v1/gifs/search?q=" +
    animalNameFromBtnClick +
    "&api_key=" +
    apiKey +
    "&limit=10";

  $.ajax({
    type: "GET",
    url: queryUrl
  }).then(function(response) {
    console.log(response);
    var objIndex = response.data.length;
    for (var i = 0; i < objIndex; i++) {
      var sectionDiv = $("<div class='sectionDiv'>");
      var img = $("<img class='d-inline'>");
      var imgSrc_still = response.data[i].images.fixed_width_still.url;
      var imgSrc_animate = response.data[i].images.fixed_width.url;
      var ratings = response.data[i].rating;
      img.attr("src", imgSrc_still);
      img.attr("data-still", imgSrc_still);
      img.attr("data-animate", imgSrc_animate);
      img.attr("data-state", "still");
      img.addClass("gif");
      sectionDiv.append(
        img,
        $("<h5 class='d-block'>").text("Ratings: " + ratings)
      );
      resultDiv.append(sectionDiv);
      apiSec.append(resultDiv);
    }
    $(".gif").click(function(e) {
      e.preventDefault();
      console.log("data-state:" + $(this).attr("data-state"));
      var state = $(this).attr("data-state");
      if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
      } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
      }
      // function to still other animating image when this image is clicked
      $(".gif")
        .not(this)
        .each(function(e) {
          $(this).attr("src", $(this).attr("data-still"));
          $(this).attr("data-state", "still");
        });
    });
  });
  $("button").on("dblclick", function() {
    $(this).remove();
  });
});
