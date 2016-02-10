var express = require('express');
var app = express();
var expressLayouts = require('express-ejs-layouts');
var http = require('http');

//application settings:
app.set('views', './views');
app.set('view engine', 'ejs');

//Middleware: 
app.use(expressLayouts);
app.use(express.static('public'));
//It's just two routes, one script. 


app.get('/books', function(req, res) {
  res.render("books");
});

//CALLBACK - gets the data from the API server and displays it to our user: 
app.get('/books/:isbn', function(request, response) {

  http.get('http://openlibrary.org/api/books?bibkeys=ISBN:'+request.params.isbn + '&jscmd=data&format=json', function(res) {
    var body = '';
    res.on('data', function(d) {
      body += d;
    });

    res.on('end', function() {
      var book = JSON.parse(body);
      response.send(book['ISBN:' + request.params.isbn]);
    });

  })


});

app.listen('3000', function() {
  console.log('Serving on port 3000')
})

















