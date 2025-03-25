// Callbacks
const handleClick = (ramen) => {
    const ramenImage = document.querySelector('.detail-image');
    const ramenName = document.querySelector('.name');
    const ramenRestaurant = document.querySelector('.restaurant');
    const ramenRating = document.getElementById('rating-display');
    const ramenComment = document.getElementById('comment-display');
  
    ramenImage.src = ramen.image;
    ramenName.textContent = ramen.name;
    ramenRestaurant.textContent = ramen.restaurant;
    ramenRating.textContent = ramen.rating;
    ramenComment.textContent = ramen.comment;
  
    const editRamenForm = document.getElementById('edit-ramen');
    document.getElementById('new-rating').value = ramen.rating;
    document.getElementById('new-comment').value = ramen.comment;
    editRamenForm.dataset.ramenId = ramen.id;
  };
  
  const addSubmitListener = () => {
    const newRamenForm = document.getElementById('new-ramen');
    newRamenForm.addEventListener('submit', (event) => {
      event.preventDefault();
  
      const newRamen = {
        name: document.getElementById('new-name').value,
        restaurant: document.getElementById('new-restaurant').value,
        image: document.getElementById('new-image').value,
        rating: document.getElementById('new-rating').value,
        comment: document.getElementById('new-comment').value,
      };
  
      // Send the new ramen data to the backend
      fetch('http://localhost:3000/ramens', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newRamen),
      })
        .then((response) => response.json())
        .then((ramen) => {
          const ramenMenu = document.getElementById('ramen-menu');
          const ramenImage = document.createElement('img');
          ramenImage.src = ramen.image;
          ramenImage.alt = ramen.name;
  
          // Add event listener to new ramen image to show details on click
          ramenImage.addEventListener('click', () => handleClick(ramen));
  
          ramenMenu.appendChild(ramenImage);
  
          // Reset the form after submission
          newRamenForm.reset();
        })
        .catch((error) => console.error('Error adding new ramen:', error));
    });
  };
  
  // Move deleteRamen outside of displayRamens
  const deleteRamen = (ramenId, ramenImage, deleteButton) => {
    // Send a DELETE request to the backend to remove the ramen
    fetch(http://localhost:3000/ramens/${ramenId}, {
      method: 'DELETE',
    })
      .then(() => {
        // Remove the ramen image and delete button from the DOM
        ramenImage.remove();
        deleteButton.remove();
      })
      .catch((error) => console.error('Error deleting ramen:', error));
  };
  
  const displayRamens = (ramens) => {
    const ramenMenu = document.getElementById('ramen-menu');
    ramenMenu.innerHTML = ''; // Clear previous content
  
    ramens.forEach((ramen) => {
      const ramenImage = document.createElement('img');
      ramenImage.src = ramen.image;
      ramenImage.alt = ramen.name;
  
      // Add event listener to display ramen details when clicked
      ramenImage.addEventListener('click', () => handleClick(ramen));
  
      // Create the delete button for this ramen
      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'Delete';
  
      // Add event listener to delete the ramen
      deleteButton.addEventListener('click', () => deleteRamen(ramen.id, ramenImage, deleteButton));
  
      // Append ramen image and delete button to the ramen menu
      ramenMenu.appendChild(ramenImage);
      ramenMenu.appendChild(deleteButton);
    }); // Closing the forEach loop properly
  };
  
  // Handle the form submission to update ramen details
  const addEditSubmitListener = () => {
    const editRamenForm = document.getElementById('edit-ramen');
    editRamenForm.addEventListener('submit', (event) => {
      event.preventDefault();
  
      // Get the updated details from the form
      const updatedRamen = {
        rating: document.getElementById('new-rating').value,
        comment: document.getElementById('new-comment').value,
      };
  
      const ramenId = editRamenForm.dataset.ramenId; // Get the ramen ID to update
  
      // Send PATCH request to update the ramen on the backend
      fetch(http://localhost:3000/ramens/${ramenId}, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedRamen),
      })
        .then((response) => response.json())
        .then((ramen) => {
          // Update the ramen details on the frontend
          handleClick(ramen); // Re-render the ramen details with the new values
        })
        .catch((error) => console.error('Error updating ramen:', error));
    });
  };
  
  const main = () => {
    // Fetch ramen data from the server
    fetch('http://localhost:3000/ramens')
      .then((response) => response.json())
      .then((ramens) => {
        // Display all ramen items
        displayRamens(ramens);
  
        // Initialize the form submission listener for adding new ramen
        addSubmitListener();
  
        // Initialize the form submission listener for editing ramen
        addEditSubmitListener();
      })
      .catch((error) => console.error('Error fetching ramens:', error));
  };
  
  document.addEventListener('DOMContentLoaded', main);
  
  // Export functions for testing
  export {
    displayRamens,
    addSubmitListener,
    handleClick,
    main,
  };