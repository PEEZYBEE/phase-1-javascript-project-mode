// Callbacks
const handleClick = (book) => {
    const bookImage = document.querySelector('.detail-image');
    const bookTitle = document.querySelector('.title');
    const bookAuthor = document.querySelector('.author');
    const bookRating = document.getElementById('rating-display');
    const bookComment = document.getElementById('comment-display');
  
    bookImage.src = book.image || './assets/image-placeholder.jpg';  // Default placeholder if no image is provided
    bookTitle.textContent = book.title;
    bookAuthor.textContent = book.author;
    bookRating.textContent = book.rating || "No rating available";
    bookComment.textContent = book.comment || "No comment available";
  
    const editBookForm = document.getElementById('edit-book');
    document.getElementById('new-rating').value = book.rating || "";
    document.getElementById('new-comment').value = book.comment || "";
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
  
      // For this example, we don't add new books to the Open Library API since it's read-only.
      // But in a real scenario, you'd send the new book data to your backend.
      console.log("Adding book:", newBook);
  
      // For now, just simulate by adding the book to the display
      const bookMenu = document.getElementById('book-menu');
      const bookImage = document.createElement('img');
      bookImage.src = newBook.image;
      bookImage.alt = newBook.title;
  
      // Add event listener to new book image to show details on click
      bookImage.addEventListener('click', () => handleClick(newBook));
  
      bookMenu.appendChild(bookImage);
  
      // Reset the form after submission
      newBookForm.reset();
    });
  };
  
  // Move deleteBook outside of displayBooks
  const deleteBook = (bookId, bookImage, deleteButton) => {
    // Simulate book deletion - API does not allow deletion
    console.log(`Book with ID ${bookId} deleted`);
  
    // Remove the book image and delete button from the DOM
    bookImage.remove();
    deleteButton.remove();
  };
  
  const displayBooks = (books) => {
    const bookMenu = document.getElementById('book-menu');
    bookMenu.innerHTML = ''; // Clear previous content
  
    books.forEach((book) => {
      const bookImage = document.createElement('img');
      bookImage.src = book.image || './assets/image-placeholder.jpg';
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
    });
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
  
      // For now, simulate the book update since the Open Library API doesn't support editing.
      console.log(`Updating book ${bookId} with new rating and comment`, updatedBook);
  
      // Simulate book update by updating the UI
      handleClick(updatedBook); // Re-render the book details with the new values
    });
  };
  
  const main = () => {
    // Fetch book data from the Open Library API
    fetch('https://openlibrary.org/subjects/science_fiction.json?limit=5')  // Example: Fetching 5 science fiction books
      .then((response) => response.json())
      .then((data) => {
        // Extract book information from API response
        const books = data.works.map((work) => ({
          id: work.key,
          title: work.title,
          author: work.authors ? work.authors[0].name : 'Unknown',
          image: work.cover_id ? `https://covers.openlibrary.org/b/id/${work.cover_id}-M.jpg` : '',
          rating: "Not rated",  // Open Library does not provide ratings directly
          comment: "",  // Placeholder for user comments
        }));
  
        // Display all books
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
  