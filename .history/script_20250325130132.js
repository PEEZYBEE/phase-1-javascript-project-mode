document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('searchInput');
    const addBookForm = document.getElementById('addBookForm');
    const bookTitleInput = document.getElementById('bookTitle');
    const bookAuthorInput = document.getElementById('bookAuthor');
    const bookStatusSelect = document.getElementById('bookStatus');
    const bookList = document.getElementById('bookList');

    // Fetch books from the local JSON database
    async function fetchBooks() {
        const response = await fetch('http://localhost:5000/books');
        const books = await response.json();
        displayBooks(books);
    }

    // Display books in the UI
    function displayBooks(books) {
        bookList.innerHTML = ''; // Clear the current list
        books.forEach(book => {
            const bookDiv = document.createElement('div');
            bookDiv.classList.add('book');
            bookDiv.innerHTML = `
                <h3>${book.title}</h3>
                <p><strong>Author:</strong> ${book.author}</p>
                <p><strong>Status:</strong> ${book.status}</p>
                <button class="toggleStatus" data-id="${book.id}">Toggle Status</button>
            `;
            bookList.appendChild(bookDiv);

            // Event listener for toggling book status
            const toggleButton = bookDiv.querySelector('.toggleStatus');
            toggleButton.addEventListener('click', () => toggleStatus(book.id, book.status));
        });
    }

    // Handle adding new books
    addBookForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const newBook = {
            title: bookTitleInput.value,
            author: bookAuthorInput.value,
            status: bookStatusSelect.value,
            rating: null,
            notes: ''
        };
        fetch('http://localhost:5000/books', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newBook)
        }).then(() => {
            fetchBooks();
            addBookForm.reset();
        });
    });

    // Toggle book status
    function toggleStatus(id, currentStatus) {
        const newStatus = currentStatus === 'read' ? 'want to read' : 'read'; // Example toggle logic
        fetch(`http://localhost:5000/books/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ status: newStatus })
        }).then(() => fetchBooks());
    }

    // Search functionality
    searchInput.addEventListener('input', () => {
        const query = searchInput.value.toLowerCase();
        fetchBooks().then(books => {
            const filteredBooks = books.filter(book =>
                book.title.toLowerCase().includes(query) ||
                book.author.toLowerCase().includes(query)
            );
            displayBooks(filteredBooks);
        });
    });

    // Initial fetch of books
    fetchBooks();
});
