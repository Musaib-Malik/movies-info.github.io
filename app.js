// UI Variables
const movieName = document.getElementById("movie-name");
const result = document.querySelector("#movies");

// Event Handler
movieName.addEventListener("keyup", getMovies);

// Get Movies
async function getMovies() {
  const response = await fetch(
    `http://www.omdbapi.com?apikey=6f676ab6&s=${movieName.value}`
  );

  const data = await response.json();
  let output = "";
  data.Search.forEach((movie) => {
    output += `
      <div class="col-md-3">
        <div class="well text-center">
          <img src="${movie.Poster}" class="mt-3 mb-2">
          <h4 class="movie-title mt-3">${movie.Title}</h4>
          <a onclick="movieSelected('${movie.imdbID}')" class="btn btn-primary mb-3" href="#">Movie Details</a>
        </div>
      </div>
    `;
  });

  document.querySelector("footer").style.position = "static";
  result.innerHTML = output;
}

// Set Session Storage
function movieSelected(id) {
  sessionStorage.setItem("movieId", id);
  window.location = "movie.html";
  return false;
}

// Get Session Storage
async function getMovie() {
  let movieID = sessionStorage.getItem("movieId");

  const response = await fetch(
    `https://www.omdbapi.com?apikey=6f676ab6&i=${movieID}`
  );

  const movie = await response.json();

  let output = `
    <div class="row">
      <div class="col-md-4">
        <img src="${movie.Poster}" class="thumbnail mb-3 mt-5">
      </div>
      <div class="col-md-8">
        <h4 class="mb-3 mt-3">${movie.Title}</h4>
        <ul class="list-group">
          <li class="list-group-item">Genre:
          <strong>
          ${movie.Genre}</strong> </li>
          <li class="list-group-item">Released:
          <strong>
          ${movie.Released}</strong> </li>
          <li class="list-group-item">Rated:
          <strong>
          ${movie.Rated}</strong> </li>
          <li class="list-group-item">IMDB Rating:
          <strong>
          ${movie.imdbRating}</strong> </li>
          <li class="list-group-item">Director:
          <strong>
          ${movie.Director}</strong> </li>
          <li class="list-group-item">Writer:
          <strong>
          ${movie.Writer}</strong> </li>
          <li class="list-group-item">Actors:
          <strong>
          ${movie.Actors}</strong> </li>
        </ul>
      </div>
    </div>
    <div class="row">
      <div class="well">
        <h3 class="mt-4 ml-3">Plot</h3>
        <p class="ml-3">
        ${movie.Plot}
        </p>
        <hr>
        <a href="https://imdb.com/title/${movie.imdbID}" target="_blank" class="btn btn-primary mr-3 mb-3 ml-3">View IMDB</a>

        <a href="index.html" class="btn btn-success mb-3">Go back to search</a>
      </div>
    </div>
  `;
  document.querySelector("footer").style.position = "static";
  document.getElementById("movie").innerHTML = output;
}
