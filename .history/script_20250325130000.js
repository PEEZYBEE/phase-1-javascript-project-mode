<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Book Tracker</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="container">
        <h1>Book Tracker</h1>

        <!-- Search Books -->
        <input type="text" id="searchInput" placeholder="Search books..." />

        <!-- Add Book Form -->
        <h2>Add a New Book</h2>
        <form id="addBookForm">
            <input type="text" id="bookTitle" placeholder="Book Title" required />
            <input type="text" id="bookAuthor" placeholder="Author" required />
            <select id="bookStatus">
                <option value="want to read">Want to Read</option>
                <option value="currently reading">Currently Reading</option>
                <option value="read">Read</option>
            </select>
            <button type="submit">Add Book</button>
        </form>

        <!-- Book List -->
        <div id="bookList"></div>
    </div>
    
    <script src="script.js"></script>
</body>
</html>
