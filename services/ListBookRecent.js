const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const storageHandler = require('../storage/StorageHandler')

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));
router.use(express.urlencoded({ extended: true }))
router.use(express.json());

let storage = new storageHandler()

router.get('/', async (req, res) => {
    console.log("get recent book")

    storage.getBookListRecent((err, result) => {
        console.log("get recent book : ", result.size)
        res.status(200).send(result);
    })

});
module.exports = router;
