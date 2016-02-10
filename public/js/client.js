// alert('WORKING!!!!!!')

//First, set up a Book constructor: 
var Book = function(isbn) {
  this.url = 'http://localhost:3000/books/' + isbn;
  this.data;
}


//In JS, objs inheret from other objs. Instead of defining methods above, where we'd have to define the functions every time, we can create them below to be reused. 
Book.prototype = {
  get: function(callback) {
    var that = this;
    var request = new XMLHttpRequest();
    request.open('GET', this.url);
    request.onload = function() {
      that.data = JSON.parse(request.responseText);
      callback();
    }
    request.send(null);
  }
}


window.onload = function() {

  var form = document.querySelector('#isbnSearch');
  var input = document.querySelector('#isbnInput');
  var bookView = document.querySelector('#bookDisplay');
  var storedBooksView = document.querySelector('#storedBooks');

  var books = JSON.parse( localStorage.getItem('books') ) || [];

  var displayBooks = function() {
//Clear the loop so we don't duplicate the list: 
    storedBooksView.innerHTML = '';

    for (book in books) {
      var data = books[book];

      var li = document.createElement('li');
      li.innerHTML = "<img src='" + data.cover.small + "'>" + data.title + '<button class ="removeBook" data-id="' + book + '">Remove Book</button';

      storedBooksView.appendChild(li);
    }

  }

//Below, activated when user hits submit:
  form.onsubmit = function(event) {
    event.preventDefault();
    var isbn = input.value;
    var currentBook = new Book(isbn);

    //currentBook is an object of the Book object we created at the top of the page. 

//Here's a callback. When you see a function as an argument, it's a callback. 
    currentBook.get(function() {
      var data = currentBook.data;
      var bookDisplay = "<h4>" + data.title + "</h4><img src='"+ data.cover.large + "'><button id='addBook'>Add to list</button>";
      bookView.innerHTML = bookDisplay;

      document.querySelector('#addBook').onclick = function() {
        books.push(data);
        localStorage.setItem('books', JSON.stringify(books));
        displayBooks();
      }

    });

  }

  displayBooks();

}



//Still to come: remove books function. 