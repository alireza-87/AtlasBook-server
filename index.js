const express = require('express');
const bodyParser = require('body-parser');
const storageHandler = require('./storage/StorageHandler')
const ListBook = require('./services/ListBook')
const ListCategory = require('./services/ListCategory')
const ListBookRecent = require('./services/ListBookRecent')
const ListBookRecom = require('./services/ListBookRecom')
const DownloadBook = require('./services/DownloadBook')

let storage = new storageHandler()
storage.init()

const app = express();
app.use(bodyParser.json());
app.use('/booklist', ListBook);
app.use('/catglist', ListCategory);
app.use('/recent', ListBookRecent);
app.use('/recom', ListBookRecom);
app.use('/download', DownloadBook);

app.listen(1080);
//storage.insertAuther("A name", "A DESC", "A image.JPG")
//storage.insertTranslator("T name", "T DESC", "T image.JPG")
//storage.insertCategory("Novel", "TEST DESC", "NOJMAGE.JPG")
//storage.insertCategory("Child", "TEST DESC", "NOJMAGE.JPG")
//storage.insertCategory("Other", "TEST DESC", "NOJMAGE.JPG")
//storage.insertBook("book name", "book desc", "book hash", 101, "book image", 101, 101)
