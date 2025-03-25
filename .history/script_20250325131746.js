document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('searchInput');
    const bookList = document.getElementById('bookList');
    const toReadList = document.getElementById('toReadBooks');
    const currentlyReadingList = document.getElementById('currentlyReadingBooks');
    const completedList = document.getElementById('completedBooks');

    // Load saved reading lists from localStorage
    loadReadingLists();

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
            const bookDetails = {
                id: book.id,
                title: title,
                authors: authors,
                imageUrl: imageUrl
            };

            bookDiv.innerHTML = `
                <img src="${imageUrl}" alt="${title}" />
                <h3>${title}</h3>
                <p><strong>Author(s):</strong> ${authors}</p>
                <button class="addToReadingList" data-id="${book.id}" data-title="${title}" data-authors="${authors}" data-image="${imageUrl}">Add to To-Read</button>
            `;
            bookList.appendChild(bookDiv);

            // Add book to a specific reading list
            const addButton = bookDiv.querySelector('.addToReadingList');
            addButton.addEventListener('click', (e) => {
                const bookDetails = {
                    id: e.target.getAttribute('data-id'),
                    title: e.target.getAttribute('data-title'),
                    authors: e.target.getAttribute('data-authors'),
                    imageUrl: e.target.getAttribute('data-image')
                };
                addToReadingList(bookDetails, 'toRead');
            });
        });
    }

    // Handle adding books to the reading list
    function addToReadingList(bookDetails, listName) {
        // Retrieve current list from localStorage, or create an empty list
        let readingList = JSON.parse(localStorage.getItem(listName)) || [];

        // Add the book to the list if not already added
        if (!readingList.some(book => book.id === bookDetails.id)) {
            readingList.push(bookDetails);
            localStorage.setItem(listName, JSON.stringify(readingList));
            loadReadingLists(); // Reload the lists in the UI
        } else {
            alert('This book is already in your reading list!');
        }
    }

    // Load reading lists from localStorage
    function loadReadingLists() {
        // Load each list
        const toRead = JSON.parse(localStorage.getItem('toRead')) || [];
        const currentlyReading = JSON.parse(localStorage.getItem('currentlyReading')) || [];
        const completed = JSON.parse(localStorage.getItem('completed')) || [];

        // Clear the current lists in the UI
        toReadList.innerHTML = '';
        currentlyReadingList.innerHTML = '';
        completedList.innerHTML = '';

        // Populate the lists with books
        toRead.forEach(book => appendBookToList(book, 'toRead'));
        currentlyReading.forEach(book => appendBookToList(book, 'currentlyReading'));
        completed.forEach(book => appendBookToList(book, 'completed'));
    }

    // Append a book to a specific list
    function appendBookToList(book, listName) {
        const li = document.createElement('li');
        li.innerHTML = `
            <img src="${book.imageUrl}" alt="${book.title}" />
            <h4>${book.title}</h4>
            <p>By: ${book.authors}</p>
            <button class="removeFromList" data-id="${book.id}" data-list="${listName}">Remove</button>
        `;
        document.getElementById(`${listName}List`).appendChild(li);

        // Add remove button functionality
        const removeButton = li.querySelector('.removeFromList');
        removeButton.addEventListener('click', () => removeFromReadingList(book.id, listName));
    }

    // Remove a book from a list
    function removeFromReadingList(bookId, listName) {
        let readingList = JSON.parse(localStorage.getItem(listName)) || [];
        readingList = readingList.filter(book => book.id !== bookId);
        localStorage.setItem(listName, JSON.stringify(readingList));
        loadReadingLists(); // Reload the lists in the UI
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
