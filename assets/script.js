var apiKey = "k_09b1k3at";
var keywordFormEl=document.querySelector("#keyword-search-form");
var keywordInputEl=document.querySelector("#movie");
var ratingControlEl=document.querySelector("#rating");
var genreSelectionEl=document.querySelector("#genre");
var searchButtonEl=document.querySelector("#keyword-search");
var movieFieldEl=document.querySelector("#movie-field");
var movieSearchForm = document.querySelector("#movie-search")

// fetch request from imdb api

var fetchSuggestedMovie = function(movie){
  var apiKey = "k_09b1k3at"
  var apiURL = 'https://imdb-api.com/en/API/SearchMovie/' + apiKey + "/" + movie

  fetch(apiURL)
  .then(function(response) {
    response.json().then(function(data) {
      // displayMovie(data, movie);
      console.log(data, movie);
    });
  });
};



fetchSuggestedMovie("inception");

var savedMovies = {};

var saveMovies = function() {
    var savedMoviesString = JSON.stringify(savedMovies);
    localStorage.setItem("movies", savedMoviesString);
}

var loadMovies = function() {
    var retrievedMovies = JSON.parse(localStorage.getItem("movies"));
    
    if (!retrievedMovies) {
        savedMovies = {};
    }
    else {
        retrievedMovies.array.forEach(function(element) {
            if (savedMovies.status === toWatch) {
                displayMovies(element);
            }
            else if (savedMovies.status === watched) {
                displayMovies(element);
            }
        });
    }
}

$("#trash").droppable({
    accept: "  ",
    tolerance: "touch",
    drop: function(event, ui) {
    ui.draggable.remove();
    },
    // over: function(event, ui) {

    // },
    // out: function(event, ui) {

    // }
});
