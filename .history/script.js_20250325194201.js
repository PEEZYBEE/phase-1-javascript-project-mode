document.addEventListener("DOMContentLoaded", () => {
    fetch("http://localhost:3000/movies") // Fetch movies from the local JSON server
        .then(response => response.json()) // Convert response to JSON
        .then(movies => {
            const banner = document.getElementById("banner");
            const title = document.getElementById("title");
            const description = document.getElementById("description");
            const runtime = document.getElementById("runtime");
            const hashtag = document.getElementById("hashtad");
            const seriesList = document.getElementById("series");

            // Function to update the main movie details
            function updateMovieDetails(movie) {
                banner.src = movie.image;
                title.textContent = movie.title;
                description.textContent = movie.description;
                runtime.textContent = `Runtime: ${movie.runtime}`;
                hashtag.textContent = movie.hashtag;
            }

            // Display the first movie by default
            if (movies.length > 0) {
                updateMovieDetails(movies[0]);
            }

            // Populate the movie list
            seriesList.innerHTML = ""; // Clear existing list
            movies.forEach(movie => {
                const listItem = document.createElement("li");
                listItem.innerHTML = `
                    <img src="${movie.image}" alt="${movie.title}" class="movie-thumb">
                    <p>${movie.title}</p>
                `;

                // When a movie is clicked, update the details
                listItem.addEventListener("click", () => {
                    updateMovieDetails(movie);
                });

                seriesList.appendChild(listItem);
            });
        })
        .catch(error => console.error("Error fetching data:", error));
});
