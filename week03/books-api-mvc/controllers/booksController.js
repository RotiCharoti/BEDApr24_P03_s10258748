// This file is to control and define the functions of CRUD when calling database for books
// Utilise book class methods of Book.xxxx() to perform CRUD operations

const Book = require('../models/book');

// This is GET entire array of books
const getAllBooks = async (req, res) => {
    try {
      const books = await Book.getAllBooks();
      res.json(books);
    } catch (error) {
      console.error(error);
      res.status(500).send("Error retrieving books");
    }
  };
  
  // This is to GET book filtered by id as a parameter
  const getBookById = async (req, res) => {
    const bookId = parseInt(req.params.id);
    try {
      const book = await Book.getBookById(bookId);
      if (!book) {
        return res.status(404).send("Book not found");
      }
      res.json(book);
    } catch (error) {
      console.error(error);
      res.status(500).send("Error retrieving book");
    }
  };
  
  // This is to POST book, create new entry in database
  const createBook = async (req, res) => {
    const newBook = req.body;
    try {
      const createdBook = await Book.createBook(newBook);
      res.status(201).json(createdBook);
    } catch (error) {
      console.error(error);
      res.status(500).send("Error creating book");
    }
  };
  
  // This is to update book, update existing entry in database
  const updateBook = async (req, res) => {
    const bookId = parseInt(req.params.id);
    const newBookData = req.body;
  
    try {
      const updatedBook = await Book.updateBook(bookId, newBookData);
      if (!updatedBook) {
        return res.status(404).send("Book not found");
      }
      res.json(updatedBook);
    } catch (error) {
      console.error(error);
      res.status(500).send("Error updating book");
    }
  };
  
  // This is to delete book in database
  const deleteBook = async (req, res) => {
    const bookId = parseInt(req.params.id);
  
    try {
      const success = await Book.deleteBook(bookId);
      if (!success) {
        return res.status(404).send("Book not found");
      }
      res.status(204).send();
    } catch (error) {
      console.error(error);
      res.status(500).send("Error deleting book");
    }
  };
  
  // Export modules to use in main.js
  module.exports = {
    getAllBooks,
    createBook,
    getBookById,
    updateBook,
    deleteBook,
  };