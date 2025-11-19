// Get books from the server
async function fetchBooks() {
    const response = await fetch('/api/books');
    const books = await response.json();
    return books;
  }
  
  // Display books and allow users to rank them
  async function displayBooks() {
    const books = await fetchBooks();
    const bookList = document.getElementById("book-list");
  
    books.forEach((book, index) => {
      const bookItem = document.createElement("div");
      bookItem.innerHTML = `
        <input type="radio" name="book${index}" value="${book.id}">
        <label>${book.title} by ${book.author}</label>
      `;
      bookList.appendChild(bookItem);
    });
  }
  
  // Submit rankings to the server
  async function submitRankings(event) {
    event.preventDefault();
  
    const rankings = [];
    const formData = new FormData(document.getElementById("rankingForm"));
    
    for (const [key, value] of formData.entries()) {
      rankings.push(value);  // Save the rankings in order
    }
  
    const username = prompt("Enter your name:");
  
    const response = await fetch('/api/rankings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, rankings })
    });
  
    if (response.ok) {
      alert("Your rankings have been saved!");
    } else {
      alert("Error saving rankings!");
    }
  }
  
  // Initialize the page with books and handle form submission
  document.addEventListener('DOMContentLoaded', () => {
    displayBooks();
    document.getElementById('rankingForm').addEventListener('submit', submitRankings);
  });
  