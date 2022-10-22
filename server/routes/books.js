// modules required for routing
let express = require("express");
let router = express.Router();
let mongoose = require("mongoose");

// define the book model
let book = require("../models/books");

/* GET books List page. READ */
router.get("/", (req, res, next) => {
  // find all books in the books collection
  book.find((err, books) => {
    if (err) {
      return console.error(err);
    } else {
      res.render("books/index", {
        title: "Books",
        books: books,
      });
    }
  });
});

//  GET the Book Details page in order to add a new Book
router.get("/add", (req, res, next) => {
  /*****************
   * ADD CODE HERE *
   *****************/
  res.render("books/add.ejs", { title: "Add Book" });
});

// POST process the Book Details page and create a new Book - CREATE
router.post("/add", (req, res, next) => {
  /*****************
   * ADD CODE HERE *
   *****************/
  // instance a book object and get the req.body
  let { title, author, price, description, genre } = req.body;
  let newBook = new book({
    title,
    author,
    price,
    description,
    genre,
  });
  // save the new book
  newBook.save().then(() => {
    console.log("Book have been saved");
    console.log(`${title}, ${author}, ${price}, ${description}, ${genre}`);
    res.render("books/index", {
      title: "Books",
      books: books,
    });
  });
});

// GET the Book Details page in order to edit an existing Book
router.get("/:id", (req, res, next) => {
  /*****************
   * ADD CODE HERE *
   *****************/
   let {id} = req.body;
   book.findById(id, (err, bookEdit) => {
     if(err){
       res.send("ERROR");
     }
     else{
       res.render('book/edit', {title: "Edit Book", book: bookEdit});

     }
   })
});

// POST - process the information passed from the details form and update the document
router.post("/:id", (req, res, next) => {
  /*****************
   * ADD CODE HERE *
   *****************/
  let {id, title, author, price, description, genre} = req.params;
  let updatedBook = Book(
    {
      _id: id,
      title,
      price,
      description,
      genre
    }
  )
}
);

// GET - process the delete by user id
router.get("/delete/:id", (req, res, next) => {
  /*****************
   * ADD CODE HERE *
   *****************/
  let {id} = req.params;
  book.remove({_id: id}, (err) =>{
    if(err){
      console.log(err);
    }
  })
});

module.exports = router;
