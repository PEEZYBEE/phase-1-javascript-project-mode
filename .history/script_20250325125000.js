document.addEventListener('DOMContentLoaded', function() {
    const postsList = document.getElementById('postsList');
    const searchInput = document.getElementById('searchInput');
    
    // Fetch posts data from API
    async function fetchPosts() {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        const posts = await response.json();
        displayPosts(posts);
    }

    // Display posts
    function displayPosts(posts) {
        postsList.innerHTML = ''; // Clear any existing posts
        posts.forEach(post => {
            const postElement = document.createElement('div');
            postElement.classList.add('post');
            postElement.innerHTML = `
                <h2>${post.title}</h2>
                <p>${post.body}</p>
            `;
            postsList.appendChild(postElement);
        });
    }

    // Search functionality
    searchInput.addEventListener('input', function() {
        const searchText = searchInput.value.toLowerCase();
        fetchPosts().then(posts => {
            const filteredPosts = posts.filter(post => 
                post.title.toLowerCase().includes(searchText) || 
                post.body.toLowerCase().includes(searchText)
            );
            displayPosts(filteredPosts);
        });
    });

    // Initial fetch
    fetchPosts();
});
