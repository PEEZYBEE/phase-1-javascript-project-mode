document.addEventListener("DOMContentLoaded", () => {
    fetch("http://localhost:3000/series") // Fetch series data from the JSON server
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(seriesData => {
            const banner = document.getElementById("banner");
            const title = document.getElementById("title");
            const description = document.getElementById("description");
            const runtime = document.getElementById("runtime");
            const hashtag = document.getElementById("hashtag");
            const seriesList = document.getElementById("series");

            // Function to update the movie details
            function updateSeriesDetails(series) {
                banner.src = series.image;
                banner.alt = series.title;
                title.textContent = series.title;
                description.textContent = series.description;
                runtime.textContent = `Runtime: ${series.runtime}`;
                hashtag.textContent = series.hashtag;
            }

            // Show the first series as default
            if (seriesData.length > 0) {
                updateSeriesDetails(seriesData[0]);
            }

            // Populate the series list dynamically
            seriesList.innerHTML = ""; // Clear existing list
            seriesData.forEach(series => {
                const listItem = document.createElement("li");
                listItem.innerHTML = `
                    <img src="${series.image}" alt="${series.title}" class="series-thumb">
                    <p>${series.title}</p>
                `;

                // When a series is clicked, update the details
                listItem.addEventListener("click", () => {
                    updateSeriesDetails(series);
                });

                seriesList.appendChild(listItem);
            });
        })
        .catch(error => console.error("Error fetching data:", error));
});
