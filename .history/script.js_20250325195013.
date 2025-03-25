document.addEventListener("DOMContentLoaded", () => {
    fetch("http://localhost:3000/series") // Fetch series data from the local JSON server
        .then(response => response.json()) // Convert response to JSON
        .then(series => {
            const banner = document.getElementById("banner");
            const title = document.getElementById("title");
            const description = document.getElementById("description");
            const runtime = document.getElementById("runtime");
            const hashtag = document.getElementById("hashtad");
            const seriesList = document.getElementById("series");

            // Function to update the series details
            function updateSeriesDetails(seriesItem) {
                banner.src = seriesItem.image;
                title.textContent = seriesItem.title;
                description.textContent = seriesItem.description;
                runtime.textContent = `Runtime: ${seriesItem.runtime}`;
                hashtag.textContent = seriesItem.hashtag;
            }

            // Display the first series by default
            if (series.length > 0) {
                updateSeriesDetails(series[0]);
            }

            // Populate the series list
            seriesList.innerHTML = ""; // Clear existing list
            series.forEach(seriesItem => {
                const listItem = document.createElement("li");
                listItem.innerHTML = `
                    <img src="${seriesItem.image}" alt="${seriesItem.title}" class="series-thumb">
                    <p>${seriesItem.title}</p>
                `;

                // When a series is clicked, update the details
                listItem.addEventListener("click", () => {
                    updateSeriesDetails(seriesItem);
                });

                seriesList.appendChild(listItem);
            });
        })
        .catch(error => console.error("Error fetching data:", error));
});
