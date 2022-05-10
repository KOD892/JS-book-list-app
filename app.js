//classes
class Book {
    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}
class UI {
    addBook(book) {
        //var totalBooks = 0;
        let list = document.querySelector('#book-list');
        let newBook = document.createElement('tr');
        newBook.innerHTML =

            `<td>${book.title}</td>
             <td>${book.author}</td>
             <td>${book.isbn}</td>
             <td><a href='#' class='remove-book'>X</a></td> `;
        list.appendChild(newBook);
    };
    clearInputs(t, a, i) {
        t.value = "";
        a.value = "";
        i.value = "";
    };
    showMsg(msg, className) {
        let div = document.createElement('div');
        div.className = ` alert ${className} `;
        div.appendChild(document.createTextNode(msg))
        document.querySelector('.container').insertBefore(div, form)
        setTimeout(() => { document.querySelector('.alert').remove() }, 3000)
    };
    removeBook(target) {
        target.remove();
    }
}
class Store {
    getBooks() {
        let books;
        if (localStorage.getItem("Books") != null) {
            books = JSON.parse(localStorage.getItem("Books"));
        } else {
            books = [];
        }
        return books;
    }
    showBooks() {
        let books = this.getBooks();
        for (const book of books) {
            ui.addBook(book);
        }
    }
    storeBook(book) {
        let books = this.getBooks();
        books.push(book);
        localStorage.setItem("Books", JSON.stringify(books));
    };
    deleteBook(isbn) {
        let books = this.getBooks();
        books.forEach((book, index) => {
            if (book.isbn == isbn) {
                books.splice(index, 1)
            }
        })
        localStorage.setItem("Books", JSON.stringify(books));

    };

}

//DOM selectors
var form = document.querySelector('#book-form');
var ui = new UI();
var store = new Store();



//event Listners
form.addEventListener('submit', (e) => {
    let title = document.getElementById('title'),
        author = document.getElementById('author'),
        isbn = document.getElementById('isbn');
    if (title.value == "" || author.value == "" || isbn.value == "") {
        ui.showMsg('pls fill all input fields', 'error')

    } else {
        var book = new Book(title.value, author.value, isbn.value);
        ui.addBook(book);
        store.storeBook(book);
        ui.showMsg('Book added successfully', 'success')
        ui.clearInputs(title, author, isbn);

    }
    e.preventDefault();
});
document.querySelector('#book-list').addEventListener('click', (e) => {
    if (e.target.classList.contains('remove-book')) {
        // console.log(e.target.parentElement.parentElement);
        ui.removeBook(e.target.parentElement.parentElement);
        store.deleteBook(e.target.parentElement.previousElementSibling.textContent);
        ui.showMsg('Book deleted Successfully', 'success')
    }

    e.preventDefault();
})
document.addEventListener('DOMContentLoaded', (e) => {
    store.showBooks();
})