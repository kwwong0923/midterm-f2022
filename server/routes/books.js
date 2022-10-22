// Ka Wai Wong
// 301201043
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
    title: req.body.title,
    author: req.body.author,
    price: req.body.price,
    description: req.body.description,
    genre: req.body.genre,
  });
  // save the new book
  book.create(newBook, () => {
    res.redirect("/books");
  });
});

// GET the Book Details page in order to edit an existing Book
router.get("/edit/:id", (req, res, next) => {
  /*****************
   * ADD CODE HERE *
   *****************/

  let id = req.params.id;
  book.findOne({ _id: id }, (err, bookEdit) => {
    if (err) {
      res.send("ERROR");
    } else {
      res.render("books/edit.ejs", { title: "Edit Book", book: bookEdit });
    }
  });
});

// POST - process the information passed from the details form and update the document
router.post("/edit/:id", (req, res, next) => {
  /*****************
   * ADD CODE HERE *
   *****************/
  let id = req.params.id;
  let updatedBook = Book({
    _id: id,
    title: req.body.title,
    author: req.body.author,
    price: req.body.price,
    description: req.body.description,
    genre: req.body.genre,
  });

  book.updateOne({ _id: id }, updatedBook);
});

// GET - process the delete by user id
router.get("/delete/:id", (req, res, next) => {
  /*****************
   * ADD CODE HERE *
   *****************/
  console.log("DELETE");
  let id = req.params.id;
  book.remove({ _id: id }, (err) => {
    if (err) {
      console.log(err);
    }
  });
});

module.exports = router;
