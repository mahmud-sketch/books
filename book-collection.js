const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/index.html"));
});

app.get("/books", (req, res) => {
  fs.readFile("./book.json", "utf-8", (err, data) => {
    const bookData = JSON.parse(data);
    res.setHeader("Content-Type", "application/json");
    res.send(bookData);
  });
});

app.post("/books", (req, res) => {
  fs.readFile("./book.json", "utf-8", (err, data) => {
    const bookData = JSON.parse(data);
    let newBook = req.body;
    let id;
    !bookData.length ? (id = 1) : (id = bookData[bookData.length - 1]?.id + 1);
    bookData.push({ id: id, ...newBook });
    console.log(bookData);
    fs.writeFile("./book.json", JSON.stringify(bookData), (err) => {
      res.setHeader("Content-Type", "application/json");
      res.send(bookData);
    });
  });
});

app.delete("/books/:id", (req, res) => {
  console.log(req.params.id);
  fs.readFile("./book.json", "utf-8", (err, data) => {
    const bookData = JSON.parse(data);
    let id = req.params.id;
    if (!bookData.length) {
      res.send("No data exists.Deletion not possible!");
    } else {
      const book = bookData.find(bk=>bk.id==id);
      if(!book){
        res.send("No such exists.Deletion not possible!");
      }else{
        let newBookdata= bookData.filter(bk=>bk.id!=id);
        fs.writeFile("./book.json", JSON.stringify(newBookdata), (err) => {
            res.setHeader("Content-Type", "application/json");
            res.send("delete successfull"));
          });}
      }
      
     
     
    
  });
});

app.listen(5050, () => {
  console.log("server success");
});
