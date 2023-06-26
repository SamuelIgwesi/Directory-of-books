const router = require("express").Router();
const Book = require("./model/books");
// const books = require("./books.json");

// // Get all the books
// router.get("/", (req, res) => {
//   res.json(books);
// });

// // Get a specific book
// router.get("/:id", (req, res) => {
//   const { id } = req.params;
//   res.json(books.filter((ele) => ele.id === parseInt(id)));
// });

// router.post("/", (req, res) => {
//   const body = req.body;
//   console.log(body);
//   books.push(body);
//   res.json({ message: "The book has been added" });
// });

// router.put("/:id", (req, res) => {
//   const { id } = req.params;
//   const body = req.body;
//   books.forEach((book, index) => {
//     if (book.id === parseInt(id)) {
//       books[index] = body;
//     }
//   });
//   res.json({ message: `The book with ID ${id} has been updated` });
//   // res.json(books);
// });

// router.delete("/:id", (req, res) => {
//   const { id } = req.params;
//   books.forEach((book, index) => {
//     if (book.id === parseInt(id)) {
//       books.splice(index);
//     }
//   });
//   res.json({ message: `Book with id #${id} has been deleted` });
// });

// ADD NEW BOOK
router.post("/api/v1/books", async (req, res) => {
  if (req.body) {
    const newBook = new Book(req.body);
    // console.log("hello");
    try {
      const savedBook = await newBook.save();
      res.status(201).json(savedBook);
    } catch (error) {
      res.status(error).json(error);
    }
  } else {
    console.log("An error has occured");
  }
});

// UPDATE BOOK
router.patch("/api/v1/books/:id", async (req, res) => {
  if (req.params.id) {
    try {
      const updatedBook = await Book.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.params,
        },
        { new: true }
      );

      res.status(201).json(updatedBook);
    } catch (error) {
      res.status(error).json(error);
    }
  } else {
    console.log("Unable to update book");
  }
});

// DELETE BOOK
router.delete("/api/v1/books/:id", async (req, res) => {
  if (req.body.delete) {
    try {
      const deleteBook = await Book.findByIdAndDelete(req.params.id, {
        $set: req.params,
      });
      res
        .status(201)
        .json(`Book with the id of ${deleteBook} has been deleted`);
    } catch (error) {
      res.status(error).json(error);
    }
  }
});

// GET BOOKS
router.get("/api/v1/books/find/:id", async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    res.status(201).json(book);
  } catch (error) {
    res.status(error).json(error);
  }
});

module.exports = router;
