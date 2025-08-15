class Book {
  constructor(title, author, isRead = false) {
    this.title = title;
    this.author = author;
    this.isRead = isRead;
  }

  toggleRead() {
    return (this.isRead = !this.isRead);
  }
}

class Library {
  constructor(containerElement) {
    this.books = [];
    this.containerElement = containerElement;
  }

  addBook(book) {
    // add book to library array
    this.books.push(book);
    this.renderBooks();
  }

  removeBook(title) {
    // remove book by title
    this.books = this.books.filter((book) => book.title !== title);
  }

  renderBooks() {
    containerElement.innerHTML = "";
    // remove books in DOM

    for (const book of this.books) {
      const divElement = document.createElement("div");
      divElement.classList.add("book-card");

      const pElement = document.createElement("p");
      pElement.textContent = `${book.title} by ${book.author}`;

      if (book.isRead) {
        pElement.style.textDecoration = "line-through";
      }

      const checkBtn = document.createElement("button");
      checkBtn.textContent = "✓";

      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = "✗";

      divElement.appendChild(pElement);
      divElement.appendChild(checkBtn);
      divElement.appendChild(deleteBtn);

      this.containerElement.appendChild(divElement);

      checkBtn.addEventListener("click", () => {
        book.toggleRead();
        this.renderBooks();
      });

      deleteBtn.addEventListener("click", () => {
        this.removeBook(book.title);
        this.renderBooks();
      });
    }
  }
}

// accessing html element
const bookTitle = document.getElementById("bookTitle");
const bookAuthor = document.getElementById("bookAuthor");
const addBookBtn = document.getElementById("addBookBtn");
const containerElement = document.getElementById("bookList");

let book;
const library = new Library(containerElement);

addBookBtn.addEventListener("click", () => {
  book = new Book(bookTitle.value, bookAuthor.value);
  library.addBook(book);
  bookTitle.value = "";
  bookAuthor.value = "";
});
