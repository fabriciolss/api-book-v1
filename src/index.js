const express = require('express');
const bookData = require('./books-backup.json');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json()); 

app.get('/', (req, res) => {
    res.status(200).json(bookData);
})

app.get('/:id', (req, res) => {
    const bookId = req.params.id;
    const bookRead = findBook(bookId);
    res.status(200).json(bookRead);
})

app.post('/', (req, res) => {
    const bodyParams = req.body;
    const idLast = bookData.length + 1;
    const bookCreate = {id: idLast, ...bodyParams}
    bookData.push(bookCreate);
    res.status(201).json(bookCreate);
})

app.put('/:id', (req, res) => {
    const bookId = req.params.id;
    const bodyParams = req.body;
    const bookUpdate = {id: bookId, ...bodyParams};
    bookData[findIndex(bookId)] = bookUpdate;

    res.status(200).json(bodyParams);
})

app.delete('/:id', (req, res) => {
    const bookId = req.params.id;
    const bookDelete = findIndex(bookId)
    bookData.splice(bookDelete, 1);
    res.status(204).json(bookData);
})

app.listen(port, () => {
     console.log(`Server running on port ${port}`);
})

function findBook(id){
    const indexBook = findIndex(id);
    return bookData[indexBook];
}

function findIndex(id){
    return bookData.findIndex(book => book.id == id);
}