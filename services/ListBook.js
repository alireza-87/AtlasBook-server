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
    console.log("get booklist of catg")
    var catgId = req.query.cid
    if (catgId != null) {
        console.log("get booklist of catg : ", catgId)
        storage.getBookList(catgId, (err, result) => {
            console.log("get booklist of catg result : ", result.size)
            res.status(200).send(result);
        })
    }


});
module.exports = router;
