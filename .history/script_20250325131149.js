document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('searchInput');
    const bookList = document.getElementById('bookList');

    // Fetch books from the Google Books API
    async function fetchBooks(query) {
        const url = `https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=10`;
        const response = await fetch(url);
        const data = await response.json();
        const books = data.items || [];
        displayBooks(books);
    }

    // Display books in the UI
    function displayBooks(books) {
        bookList.innerHTML = ''; // Clear the current list
        books.forEach(book => {
            const bookInfo = book.volumeInfo;
            const bookDiv = document.createElement('div');
            bookDiv.classList.add('book');
            const title = bookInfo.title || 'No title available';
            const authors = bookInfo.authors ? bookInfo.authors.join(', ') : 'Unknown author';
            const imageUrl = bookInfo.imageLinks ? bookInfo.imageLinks.thumbnail : 'https://via.placeholder.com/128x200.png?text=No+Image';

            bookDiv.innerHTML = `
                <img src="${imageUrl}" alt="${title}" />
                <h3>${title}</h3>
                <p><strong>Author(s):</strong> ${authors}</p>
                <button class="addToReadingList" data-id="${book.id}">Add to Reading List</button>
            `;
            bookList.appendChild(bookDiv);

            // Add book to a reading list
            const addButton = bookDiv.querySelector('.addToReadingList');
            addButton.addEventListener('click', () => {
                addToReadingList(book.id);
            });
        });
    }

    // Handle adding books to the reading list
    function addToReadingList(bookId) {
        // Get the book details using the bookId (implement this later)
        console.log(`Added book with ID: ${bookId} to the reading list`);
    }

    // Search functionality (triggered on input)
