// https://www.youtube.com/watch?v=JaMCxVWtW58
// use getElementByClassName > queryselector as it 99% quicker
//var test = require('test.js');
//import { square } from './test.js';
import { info } from './config.js';


console.log(info["persona"]["Chariot"])
// Book Class: Represents a Book
class Book {
    constructor(title, author, isbn){
        this.title = title
        this.author = author
        this.isbn = isbn
    }
}

// UI Class: Handle UI Tasks
class UI {
    static displayBooks() {
        const books = Store.getBooks()
        
        books.forEach((book) => UI.addBookToList(book))
    }

    static addBookToList(book) {
        // get thee id
        const list= document.getElementById('book-list')
        // declare what type of html you want
        const row = document.createElement('tr')

        row.innerHTML = `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.isbn}</td>
            <td><a href="#" class="btn btn-danager btn-sm delete">X</a></td>
        `

        list.appendChild(row)
    }

    static deleteBook(elem) {
        if (elem.classList.contains('delete')) {
            elem.parentElement.parentElement.remove()
            // need to remove parent element x 2 to remove further back can go even further
        }
    }

    static showAlert(message, className){
        const div = document.createElement('div')
        div.className = `alert alert-${className}`
        div.appendChild(document.createTextNode(message))

        // parent element
        const container = document.querySelector('.container')
        // where you want the code to go
        const form = document.getElementById('book-form')

        // so inside the container but before for form
        container.insertBefore(div, form)

        // Vanish in 3 seconds
        setTimeout(() => document.querySelector('.alert').remove(), 3000)
    }

    static clearFields(){
        document.getElementById('title').value = ''
        document.getElementById('author').value = ''
        document.getElementById('isbn').value = ''
    }


}

// Store Class: Handles Storage (locally inside the browser)
class Store {
    static getBooks() {
        let books
        if (localStorage.getItem('books') === null) {
            books = []
        } else {
            books = JSON.parse(localStorage.getItem('books'))
        }

        return books
    }

    static addBook(book) {
        const books = Store.getBooks()
        books.push(book)

        localStorage.setItem('books', JSON.stringify(books))
    }

    static removeBook(isbn) {
        const books = Store.getBooks()

        books.forEach((book, index) => {
            if (book.isbn === isbn ) {
                books.splice(index, 1)
            }
        })

        localStorage.setItem('books', JSON.stringify(books))
    }
}


// Events: Display Books
document.addEventListener('DOMContentLoaded', UI.displayBooks)

// Events: Add a Books
document.getElementById('book-form').addEventListener('submit', (e) => {
    // Prevent actual submit
    e.preventDefault()

    // Get form values
    const title = document.getElementById('title').value
    const author = document.getElementById('author').value
    const isbn = document.getElementById('isbn').value

    // Data validation
    if (title === '' || author === '' || isbn === '') {
        UI.showAlert('Please fill in all fields', 'danger')
    } else {
           // Instantiate book
        const book = new Book(title, author, isbn)

        // Add to the UI
        UI.addBookToList(book)

        // Add book to store
        Store.addBook(book)

        // show success message
        UI.showAlert('Book Added', 'success')

        // Clear Fields
        UI.clearFields() 
    }

})

// Events: Remove a Books
// Need to use event propigation to target the table then remove the item from it, rather than just removing the item from the table
document.getElementById('book-list').addEventListener('click', (e) => {
    // remove book from UI
    UI.deleteBook(e.target)

    // remove book from store
    // get parenet element, then closets table row then its content
    Store.removeBook(e.target.parentElement.previousElementSibling.textContent)

    // show success message
    UI.showAlert('Book Removed', 'success')
})