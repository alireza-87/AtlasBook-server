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
    console.log("get category list ")
    storage.getCategoryList((err, result) => {
        console.log("get category list : ", result.size)
        res.status(200).send(result);
    })

});
module.exports = router;
