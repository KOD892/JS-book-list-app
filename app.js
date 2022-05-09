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

//DOM selectors
var form = document.querySelector('#book-form');
var ui = new UI();



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
        ui.showMsg('Book added successfully', 'success')
        ui.clearInputs(title, author, isbn);

    }
    e.preventDefault();
});
document.querySelector('#book-list').addEventListener('click', (e) => {
    if (e.target.classList.contains('remove-book')) {
        // console.log(e.target.parentElement.parentElement);
        ui.removeBook(e.target.parentElement.parentElement);
        ui.showMsg('Book deleted Successfully', 'success')
    }

    e.preventDefault();
})