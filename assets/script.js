const apiKey = "k_an97lnp8";
const apiURL = "https://imdb-api.com/en/API/SearchMovie/";
var keywordFormEl = document.querySelector("#keyword-search-form");
var ratingControlEl = document.querySelector("#rating");
var genreSelectionEl = document.querySelector("#genre");
var searchButtonEl = document.querySelector("#keyword-search");
var movieFieldEl = document.querySelector("#movie-field");
var movieSearchForm = document.querySelector("#movie-search");
var movieSearchList = document.querySelector("#search-list");
var moviesToWatchSaved  = [];
var moviesWatchedSaved = [];


// fetch request from imdb api

var fetchSuggestedMovie = function (movie) {
  var searchKeyword = keywordFormEl.value;
  const apiKey = "k_an97lnp8"
  const apiURL = "https://imdb-api.com/en/API/SearchMovie/" + apiKey + "/" + searchKeyword
  console.log(searchKeyword);
  fetch(apiURL)
    .then(function (response) {
      return response.json()
        .then(function (data,) {
          movieSearchList.innerHTML = "";

          for (i = 0; i < (data.results).length; i++) {
            console.log(data.results);
            displaySuggestedMovie(data.results[i].title, data.results[i].image, data.results[i].description);
          }
        });
    });
};

var createMovieCard = function (title, image, date) {
  var containerDiv = document.createElement("div");
  containerDiv.setAttribute("class", "movie-card card column is-full")

  containerDiv.innerHTML = '<div class="card-content"><div class="media"><div class="media-left"><figure class="image poster"><img src="' + image + '" alt="Movie poster"></figure></div><div class="vertical-center media-content has-text-centered"><p class="title is-10 has-text-weight-bold">' + title + '</p><p class="subtitle is-6">' + date + '</p></div></div></div>'
  return containerDiv;
}

var displaySuggestedMovie = function (title, image, date) {
  movieSearchList.appendChild(createMovieCard(title, image, date));
};

movieSearchForm.addEventListener("submit", function (event) {
  var formInput = document.querySelector("#keyword-search-form");
  var searchKeyword = formInput.textContent;

  fetchSuggestedMovie(searchKeyword);
  event.preventDefault();
  return false;
});

var saveMovies = function () {
  var savedMoviesString = JSON.stringify(moviesToWatchSaved);
  localStorage.setItem("moviesToWatch", savedMoviesString);

  savedMoviesString = JSON.stringify(moviesWatchedSaved);
  localStorage.setItem("moviesWatched", savedMoviesString);
};

var loadMovies = function () {
  var retrievedToWatch = JSON.parse(localStorage.getItem("moviesToWatch"));
  var retrievedWatched = JSON.parse(localStorage.getItem("moviesWatched"));

  var toWatchContainer = document.querySelector("#to-watch");
  var watchedContainer = document.querySelector("#watched");

  if (retrievedToWatch) {
    for (i = 0; i < retrievedToWatch.length; i++) {
      console.log(retrievedToWatch[i]);
      var movieCard = createMovieCard(retrievedToWatch[i].title, retrievedToWatch[i].image, retrievedToWatch[i].date);
      toWatchContainer.appendChild(movieCard);
    }
  }
  if (retrievedWatched) {
    for (i = 0; i < retrievedWatched.length; i++) {
      console.log(retrievedWatched[i]);
      var movieCard = createMovieCard(retrievedWatched[i].title, retrievedWatched[i].image, retrievedWatched[i].date);
      watchedContainer.appendChild(movieCard);
    }
  }
}

loadMovies();
//draggable feature

$(document).ready(function () {
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
      $(this).append(droppedItem);

      moviesToWatchSaved = [];
      $(this).children().each(function() {
        if ($(this).hasClass("movie-card")) {
          var movieTitle = ($(this).find(".title").text());
          var movieImage = ($(this).find("img").attr("src"));
          var movieDate = ($(this).find(".subtitle").text());

          var movieObj = {
            "title": movieTitle,
            "image": movieImage,
            "date": movieDate
          }

          moviesToWatchSaved.push(movieObj);
        }
      });

      moviesWatchedSaved = [];
      $("#watched").children().each(function() {
        if ($(this).hasClass("movie-card")) {
          var movieTitle = ($(this).find(".title").text());
          var movieImage = ($(this).find("img").attr("src"));
          var movieDate = ($(this).find(".subtitle").text());

          var movieObj = {
            "title": movieTitle,
            "image": movieImage,
            "date": movieDate
          }

          moviesWatchedSaved.push(movieObj);
        }
        else {
          moviesWatchedSaved = [];
        }
      })

      console.log(moviesWatchedSaved);
      console.log(moviesToWatchSaved);
      saveMovies();
    }
  });

  $("#watched").droppable({
    accept: ".movie-card",
    drop: function (event, ui) {
      var droppedItem = $(ui.draggable);
      $(this).append(droppedItem);

      moviesWatchedSaved = [];
      $(this).children().each(function() {
        if ($(this).hasClass("movie-card")) {
          var movieTitle = ($(this).find(".title").text());
          var movieImage = ($(this).find("img").attr("src"));
          var movieDate = ($(this).find(".subtitle").text());

          var movieObj = {
            "title": movieTitle,
            "image": movieImage,
            "date": movieDate
          }

          moviesWatchedSaved.push(movieObj);
        }
      });
      
      moviesToWatchSaved = [];
      $("#to-watch").children().each(function() {
        if ($(this).hasClass("movie-card")) {
          var movieTitle = ($(this).find(".title").text());
          var movieImage = ($(this).find("img").attr("src"));
          var movieDate = ($(this).find(".subtitle").text());

          var movieObj = {
            "title": movieTitle,
            "image": movieImage,
            "date": movieDate
          }

          moviesToWatchSaved.push(movieObj);
        }
        else {
          moviesToWatchSaved = [];
        }
      })
      console.log(moviesWatchedSaved);
      console.log(moviesToWatchSaved);
      saveMovies();
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