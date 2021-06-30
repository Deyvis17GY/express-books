const { Router } = require('express');
const router = Router();
const fs = require('fs');
const uuid = require('uuid');

const json_book = fs.readFileSync('src/book.json', 'utf8');
let books = JSON.parse(json_book);

router.get('/', (req, res) => {
    res.render('index.ejs', {
        books
    })
})

router.get('/new-entry', (req, res) => {
    res.render('new-entry')
})

router.post('/new-entry', (req, res) => {
    const { title, autor, image, description } = req.body;
    if (!title || !autor || !image || !description) {
        res.status(404).send('Falta ingresar los campos');
        return;
    };
    let newBook = {
        id: uuid.v4(),
        title,
        autor,
        image,
        description
    };
    books.push(newBook);
    const json_books = JSON.stringify(books)
    fs.writeFileSync('src/book.json', json_books, 'utf-8')
    res.redirect('/');
})

router.get('/delete/:id', (req, res) => {
    books = books.filter(book => book.id != req.params.id);
    const json_books = JSON.stringify(books)
    fs.writeFileSync('src/book.json', json_books, 'utf-8')
    res.redirect('/');
})

module.exports = router;