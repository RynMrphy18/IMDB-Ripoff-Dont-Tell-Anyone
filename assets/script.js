var apiKey = "k_09b1k3at"

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