const bookLibrary = document.querySelector('#library').children[1];
const form = document.querySelector('form');
form.addEventListener('submit', handleForm);
const book1 = new Book(
  "Harry Potter and the Sorcerer's Stone",
  'J.K. Rowling',
  336,
  'yes'
);
const book2 = new Book('Crazy Rich Asians', 'Kevin Kwan', 544, 'no');

let library = [book1, book2];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

Book.prototype.changeReadStatus = function() {
  if (this.read === 'yes') {
    this.read = 'no';
  } else this.read = 'yes';
};

function addBookToLibrary(book) {
  library.push(book);
  saveLibrary();
  render();
}

function removeBookFromLibrary(index) {
  library.splice(index, 1);
  saveLibrary();
  render();
}

function handleEvent(e) {
  e.preventDefault();

  let index;
  if (e.target.nodeName === 'BUTTON') {
    index = e.target.parentElement.parentElement.getAttribute('data-book');
  } else if (e.target.nodeName === 'I') {
    index = e.target.parentElement.parentElement.parentElement.getAttribute(
      'data-book'
    );
  }

  if (e.target.classList.value === 'fas fa-minus-circle') {
    removeBookFromLibrary(index);
  }

  if (
    e.target.nodeName === 'BUTTON' ||
    e.target.classList.value === 'fas fa-book' ||
    e.target.classList.value === 'fas fa-book-open'
  ) {
    library[index].changeReadStatus();
    saveLibrary();
    render();
  }
}

function handleForm(e) {
  e.preventDefault();

  const bookTitle = document.getElementById('bookTitleInput').value;
  const bookAuthor = document.getElementById('bookAuthorInput').value;
  const bookPages = document.getElementById('bookPagesInput').value;
  const bookRead = document.getElementById('bookReadInput').value;
  const newBook = new Book(bookTitle, bookAuthor, bookPages, bookRead);

  addBookToLibrary(newBook);
}

function saveLibrary() {
  localStorage.setItem('library', JSON.stringify(library));
}

function setLibrary() {
  if (localStorage.library) {
    library = JSON.parse(localStorage.getItem('library')).map(book => {
      const bookObject = new Book(
        book.title,
        book.author,
        book.pages,
        book.read
      );
      return bookObject;
    });
  }
}

function render() {
  bookLibrary.innerHTML = null;
  library.forEach((book, index) => {
    bookLibrary.innerHTML += `<tr data-book=${index}>
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.pages}</td>
        <td><button class='status'>${
          book.read === 'yes'
            ? '<i class="fas fa-book"></i>'
            : '<i class="fas fa-book-open"></i>'
        }</button></td>
        <td><i class="fas fa-minus-circle" style="color:red;"></i></td>
      </tr>`;
  });
  document.querySelectorAll('[data-book]').forEach((element, index) => {
    element.addEventListener('click', handleEvent);
  });
  console.log('library rendered');
}

setLibrary();
render();
