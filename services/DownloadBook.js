const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const storageHandler = require('../storage/StorageHandler')

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));
router.use(express.urlencoded({ extended: true }))
router.use(express.json());

let storage = new storageHandler()

router.get('/', async (req, res, next) => {
    var bookId = req.query.bid
    console.log("download ", bookId)
    if (bookId != null) {
        storage.getBook(bookId, (err, result) => {
            if (err === null && result.length !== 0) {
                console.log("download no error ", result)
                const file = '../../public/atlasbook/book/' + result[0].fileName;
                res.download(file); // Set disposition and send it.
                res.status(200);
            } else {
                console.log("download 404 ")
                res.status(404).send('Not found');
            }


        })
    } else {
        res.status(404);
    }


});
module.exports = router;
