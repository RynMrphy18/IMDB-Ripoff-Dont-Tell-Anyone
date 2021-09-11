const apiKey = "k_an97lnp8";
const apiURL = "https://imdb-api.com/en/API/SearchMovie/";
var keywordFormEl = document.querySelector("#keyword-search-form");
var _keywordInputEl = document.querySelector("#movie");
var ratingControlEl = document.querySelector("#rating");
var genreSelectionEl = document.querySelector("#genre");
var searchButtonEl = document.querySelector("#keyword-search");
var movieFieldEl = document.querySelector("#movie-field");
var movieSearchForm = document.querySelector("#movie-search");
var movieSearchList = document.querySelector("#search-list");


// fetch request from imdb api

var fetchSuggestedMovie = function (movie) {
  const apiKey = "k_an97lnp8"
  const apiURL = "https://imdb-api.com/en/API/SearchMovie/" + apiKey + "/" + _keywordInputEl
  fetch(apiURL)
    .then(function (response) {
      return response.json()
        .then(function (data,) {
          for (i = 0; i < (data.results).length; i++) {
            displaySuggestedMovie(data.results[i].title, data.results[i].image, data.results[i].description);
          }

        });
    });
};

var displaySuggestedMovie = function (title, image, date) {
  var containerDiv = document.createElement("div");
  containerDiv.setAttribute("class", "movie-card card column is-full")

  containerDiv.innerHTML = '<div class="card-content"><div class="media"><div class="media-left"><figure class="image poster"><img src="' + image + '" alt="Movie poster"></figure></div><div class="vertical-center media-content has-text-centered"><p class="title is-10 has-text-weight-bold">' + title + '</p><p class="subtitle is-6">' + date + '</p></div></div></div>'
  movieSearchList.appendChild(containerDiv);
};

movieSearchForm.addEventListener("submit", function (event) {
  var formInput = document.querySelector("#keyword-search-form");
  var searchKeyword = formInput.textContent;

  fetchSuggestedMovie(searchKeyword);
  event.preventDefault();
  return false;
});


var savedMovies = {};

var saveMovies = function () {
  var savedMoviesString = JSON.stringify(savedMovies);
  localStorage.setItem("movies", savedMoviesString);
};

var loadMovies = function () {
  var retrievedMovies = JSON.parse(localStorage.getItem("movies"));

  if (!retrievedMovies) {
    savedMovies = {};
  }
  else {
    retrievedMovies.array.forEach(function (element) {
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

$(document).ready(function () {
  $("#to-watch").draggable();
  $("#watched").draggable();

  $(".movie-card").draggable({
    connectWith: $(".movie-card .list"),
    scroll: false,
    tolerance: "pointer",
    helper: "clone",
    activate: function (event) {
      console.log("activate", this);
    },
    deactivate: function (event) {
      console.log("deactivate", this);
    },
    over: function (event) {
      console.log("over", event.target);
    },
    out: function (event) {
      console.log("out", event.target);
    },
    update: function (event) {
      console.log("update", this);
    }
  });

  $("#to-watch").droppable({
    accept: ".movie-card",
    drop: function (event, ui) {
      var droppedItem = $(ui.draggable);
      $(this).append(droppedItem)
    }
  });

  $("#watched").droppable({
    accept: ".movie-card",
    drop: function (event, ui) {
      var droppedItem = $(ui.draggable);
      $(this).append(droppedItem)
    }


  });

  $("#trash").droppable({
    accept: ".movie-card",
    tolerance: "touch",
    drop: function (event, ui) {
      ui.draggable.remove();
    },
    // over: function(event, ui) {

    // },
    // out: function(event, ui) {

    // }
  });
});