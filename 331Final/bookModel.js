// Example of a book model that could be expanded to work with a database or API.
class Book {
    constructor(id, title, author, genre) {
      this.id = id;
      this.title = title;
      this.author = author;
      this.genre = genre;
    }
  
    getBookInfo() {
      return `${this.title} by ${this.author} (${this.genre})`;
    }
  }
  
  const bookData = [
    new Book(1, "The Great Gatsby", "F. Scott Fitzgerald", "Classic"),
    new Book(2, "1984", "George Orwell", "Dystopian"),
    new Book(3, "To Kill a Mockingbird", "Harper Lee", "Fiction")
  ];
  