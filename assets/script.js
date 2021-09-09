
// A user is able to choose/input criteria for their movie recommendation 
// When a user searches for a movie they are presented with a selection based off their criteria

var apiKey = "k_09b1k3at";
var keywordFormEl=document.querySelector("#keyword-search-form");
var keywordInputEl=document.querySelector("#movie");
var ratingControlEl=document.querySelector("#rating");
var genreSelectionEl=document.querySelector("#genre");
var searchButtonEl=document.querySelector("#keyword-search");
var movieFieldEl=document.querySelector("#movie-field");

// fetch request from imdb api

var fetchSuggestedMovie = function(movie){
  var apiKey = "k_09b1k3at"
  var apiURL = `https://imdb-api.com/en/API/' + movie + apiKey

  fetch(apiURL)
  .then(function(response){
    response.json().then(function(data){
      displayMovie(data, movie);
    });
  });
};

var displayMovie = function(movie, keywordSearch){
  movieFieldEl.textContent="";
  keywordFormEl.textContent=movieSearch;
}

fetchSuggestedMovie();

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

//draggable feature

    $(document).ready(function(){
    $("#to-watch").draggable();
    $("#watched").draggable();
    
    $(".movie-card").draggable ({
    connectWith: $(".movie-card .list"),
    scroll: false,
    tolerance: "pointer",
    helper: "clone",
    activate: function(event) {
        console.log("activate", this);
    },
    deactivate: function(event) {
        console.log("deactivate", this);
    },
    over: function(event) {
        console.log("over", event.target);
    },
    out: function(event) {
        console.log("out", event.target);
    },
    update: function(event) {
        console.log("update", this);
    }
    });

    $("#to-watch").droppable({
        accept: ".movie-card",
        drop: function(event, ui){
        var droppedItem= $(ui.draggable).clone();
        $(this).append(droppedItem)
        }
        }
    });

    $("#watched").droppable({
        accept: ".movie-card",
        drop: function(event, ui){
        var droppedItem= $(ui.draggable).clone();
        $(this).append(droppedItem)
        }
    });
});

    
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
