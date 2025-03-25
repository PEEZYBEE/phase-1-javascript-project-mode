// Callbacks
const handleClick = (book) => {
    const bookImage = document.querySelector('.detail-image');
    const bookTitle = document.querySelector('.title');
    const bookAuthor = document.querySelector('.author');
    const bookRating = document.getElementById('rating-display');
    const bookComment = document.getElementById('comment-display');
  
    bookImage.src = book.image;
    bookTitle.textContent = book.title;
    bookAuthor.textContent = book.author;
    bookRating.textContent = book.rating;
    bookComment.textContent = book.comment;
  
    const editBookForm = document.getElementById('edit-book');
    document.getElementById('new-rating').value = book.rating;
    document.getElementById('new-comment').value = book.comment;
    editBookForm.dataset.bookId = book.id;
  };
  
  const addSubmitListener = () => {
    const newBookForm = document.getElementById('new-book');
    newBookForm.addEventListener('submit', (event) => {
      event.preventDefault();
  
      const newBook = {
        title: document.getElementById('new-title').value,
        author: document.getElementById('new-author').value,
        image: document.getElementById('new-image').value,
        rating: document.getElementById('new-rating').value,
        comment: document.getElementById('new-comment').value,
      };
  
      // Send the new book data to the backend
      fetch('http://localhost:3000/books', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newBook),
      })
        .then((response) => response.json())
        .then((book) => {
          const bookMenu = document.getElementById('book-menu');
          const bookImage = document.createElement('img');
          bookImage.src = book.image;
          bookImage.alt = book.title;
  
          // Add event listener to new book image to show details on click
          bookImage.addEventListener('click', () => handleClick(book));
  
          bookMenu.appendChild(bookImage);
  
          // Reset the form after submission
          newBookForm.reset();
        })
        .catch((error) => console.error('Error adding new book:', error));
    });
  };
  
  // Move deleteBook outside of displayBooks
  const deleteBook = (bookId, bookImage, deleteButton) => {
    // Send a DELETE request to the backend to remove the book
    fetch(`http://localhost:3000/books/${bookId}`, {
      method: 'DELETE',
    })
      .then(() => {
        // Remove the book image and delete button from the DOM
        bookImage.remove();
        deleteButton.remove();
      })
      .catch((error) => console.error('Error deleting book:', error));
  };
  
  const displayBooks = (books) => {
    const bookMenu = document.getElementById('book-menu');
    bookMenu.innerHTML = ''; // Clear previous content
  
    books.forEach((book) => {
      const bookImage = document.createElement('img');
      bookImage.src = book.image;
      bookImage.alt = book.title;
  
      // Add event listener to display book details when clicked
      bookImage.addEventListener('click', () => handleClick(book));
  
      // Create the delete button for this book
      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'Delete';
  
      // Add event listener to delete the book
      deleteButton.addEventListener('click', () => deleteBook(book.id, bookImage, deleteButton));
  
      // Append book image and delete button to the book menu
      bookMenu.appendChild(bookImage);
      bookMenu.appendChild(deleteButton);
    }); // Closing the forEach loop properly
  };
  
  // Handle the form submission to update book details
  const addEditSubmitListener = () => {
    const editBookForm = document.getElementById('edit-book');
    editBookForm.addEventListener('submit', (event) => {
      event.preventDefault();
  
      // Get the updated details from the form
      const updatedBook = {
        rating: document.getElementById('new-rating').value,
        comment: document.getElementById('new-comment').value,
      };
  
      const bookId = editBookForm.dataset.bookId; // Get the book ID to update
  
      // Send PATCH request to update the book on the backend
      fetch(`http://localhost:3000/books/${bookId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedBook),
      })
        .then((response) => response.json())
        .then((book) => {
          // Update the book details on the frontend
          handleClick(book); // Re-render the book details with the new values
        })
        .catch((error) => console.error('Error updating book:', error));
    });
  };
  
  const main = () => {
    // Fetch book data from the server
    fetch('http://localhost:3000/books')
      .then((response) => response.json())
      .then((books) => {
        // Display all book items
        displayBooks(books);
  
        // Initialize the form submission listener for adding new book
        addSubmitListener();
  
        // Initialize the form submission listener for editing book
        addEditSubmitListener();
      })
      .catch((error) => console.error('Error fetching books:', error));
  };
  
  document.addEventListener('DOMContentLoaded', main);
  
  // Export functions for testing
  export {
    displayBooks,
    addSubmitListener,
    handleClick,
    main,
  };
  