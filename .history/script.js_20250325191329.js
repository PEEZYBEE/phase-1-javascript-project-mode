document.addEventListener('DOMContentLoaded', function() {
    const


    // This function will fetch the movies data from your local json-server
fetch('http://localhost:3000/movies')
.then(response => response.json()) // Parse the JSON from the response
.then(data => {
  // Now you can use the 'data' (which contains the movie objects)
  console.log(data);
  // You can loop through the movies array and display them on the page
  displayMovies(data);
})
.catch(error => {
  console.error('Error fetching data:', error);
});

// Function to display the movies on your webpage
function displayMovies(movies) {
const movieContainer = document.querySelector('.banner .slider'); // Assuming you have a slider container

movies.forEach(movie => {
  const movieElement = document.createElement('div');
  movieElement.classList.add('item');
  
  // Add a position or other styles if necessary
  movieElement.style.setProperty('--position', movie.id);
  
  movieElement.innerHTML = `
    <img src="${movie.image}" alt="${movie.title}">
    <h2>${movie.title}</h2>
    <p>${movie.description}</p>
    <p><b>${movie.hashtag}</b></p>
  `;
  
  movieContainer.appendChild(movieElement);
});
}
