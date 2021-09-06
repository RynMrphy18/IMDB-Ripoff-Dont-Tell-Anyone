// A user is able to choose/input criteria for their movie recommendation 
// When a user searches for a movie they are presented with a selection based off their criteria

var apiKey = "k_09b1k3at"
var keywordFormEl=document.querySelector("#keyword-search-form");
var keywordInputEl=document.querySelector("#movie");
var ratingControlEl=document.querySelector("#rating");
var genreSelectionEl=document.querySelector("#genre");
var searchButtonEl=document.querySelector("#keyword-search");

// fetch request from imdb api

var getSuggestedMovie = function(movie){
  var apiKey = "k_09b1k3at"
  var apiURL = `https://imdb-api.com/en/API/ + movie + apiKey`

  fetch(apiURL)
  .then(function(response){
    response.json().then(function(data){
      displayMovie(data, movie);
    });
  });
};

var displayMovie = function(movie, keywordSearch){

}