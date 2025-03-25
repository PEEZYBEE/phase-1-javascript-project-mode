document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('searchInput');
    const bookList = document.getElementById('bookList');

    // Fetch books from Google Books API
    async function fetchBooks(query) {
        const url = `https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=10`;
        const response = await fetch(url);
        const data = await response.json();
        const books = data.items || [];  // Check if there are any books in the response
        displayBooks(books);
    }

    // Display books in the UI
    function displayBooks(books) {
        bookList.innerHTML = ''; // Clear the current list
        if (books.length === 0) {
            bookList.innerHTML = '<p>No books found. Please try another search.</p>';
            return;
        }

        books.forEach(book => {
            const bookInfo = book.volumeInfo;
            const bookDiv = document.createElement('div');
            bookDiv.classList.add('book');

            const title = bookInfo.title || 'No title available';
            const authors = bookInfo.authors ? bookInfo.authors.join(', ') : 'Unknown author';
            const description = bookInfo.description || 'No description available';
            const imageUrl = bookInfo.imageLinks ? bookInfo.imageLinks.thumbnail : 'https://via.placeholder.com/128x200.png?text=No+Image';

            bookDiv.innerHTML = `
                <img src="${imageUrl}" alt="${title}" />
                <h3>${title}</h3>
                <p><strong>Author(s):</strong> ${authors}</p>
                <p><strong>Description:</strong> ${description}</p>
            `;

            bookList.appendChild(bookDiv);
        });
    }

    // Search functionality (triggered on input)
    searchInput.addEventListener('input', () => {
        const query = searchInput.value.trim();
        if (query.length > 2) {
            fetchBooks(query);
        } else {
            bookList.innerHTML = ''; // Clear list if search query is too short
        }
    });
});
