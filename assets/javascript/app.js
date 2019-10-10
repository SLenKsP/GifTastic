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
$(".container-fluid").append(formDiv);

// get user input and add button to animal button section
$("#submit").click(function(e) {
  e.preventDefault();

  var userInput = $("#userInput").val();
  var btnFromUserInput = $("<button class='animalName btn btn-info m-1'>");
  btnFromUserInput.text(userInput);
  btnFromUserInput.attr("name", userInput);
  animalBtnSection.append(btnFromUserInput);
});
var resultDiv = $("<div class='result'>");
// get api
$(".animalName").click(function(e) {
  e.preventDefault();
  $(".result").empty();
  var animalNameFromBtnClick = $(this).attr("name");
  console.log("clicked Animal: " + animalNameFromBtnClick);
  var apiKey = "Jc2Gco8Y1Fbo3gdJ3WLjitNtP5Q3Mz4I";
  var queryUrl =
    "http://api.giphy.com/v1/gifs/search?q=" +
    animalNameFromBtnClick +
    "&api_key=" +
    apiKey +
    "&limit=5";

  $.ajax({
    type: "GET",
    url: queryUrl
  }).then(function(response) {
    console.log(response);
    var objIndex = response.data.length;
    for (var i = 0; i < objIndex; i++) {
      var imgSrc_still = response.data[i].images.fixed_height_still.url;
      var imgSrc_animate = response.dat[i].images.fixed_height;
      var ratings = response.data[i].rating;
      resultDiv.append(
        $("<img>").attr("src", imgSrc_still),
        $("<h5>").text("Ratings: " + ratings)
      );
      $(".container-fluid").append(resultDiv);
    }
  });
});
