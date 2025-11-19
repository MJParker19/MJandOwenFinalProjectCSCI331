// Add a new book to the list
async function addBook(event) {
    event.preventDefault();
  
    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
  
    const response = await fetch('/api/books', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, author })
    });
  
    if (response.ok) {
      alert("Book added successfully!");
    } else {
      alert("Error adding book.");
    }
  }
  
  // Initialize the page and form submission
  document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('addBookForm').addEventListener('submit', addBook);
  });
  