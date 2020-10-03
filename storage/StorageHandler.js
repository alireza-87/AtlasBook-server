const dbs = require('./DatabaseHandler')
const AutherSchema = require('./models/Auther');
const BookSchema = require('./models/Books');
const CategorySchema = require('./models/Category');
const TranslatorSchema = require('./models/Translator');
let db

class StorageHandler {
    // +++++++++++++++++++++ BOOKS +++++++++++++++++++++
    getBookList(catgid, delegate) {
        BookSchema.find({ catg: catgid }).populate("auther").populate("translator").exec(function (err, res) {
            delegate(err, res)
        })
    }

    getBookListRecent(delegate) {
        BookSchema.find({}).populate("auther").populate("translator").sort({ bid: -1 }).limit(10).exec(function (err, res) {
            delegate(err, res)
        })
    }

    getBookListRecom(delegate) {
        BookSchema.find({}).populate("auther").populate("translator").sort({ bid: 1 }).limit(10).exec(function (err, res) {
            delegate(err, res)
        })
    }


    getBook(bookId, delegate) {
        BookSchema.find({ bid: bookId }).populate("auther").populate("translator").exec(function (err, res) {
            delegate(err, res)
        })
    }


    insertBook(name, desc, hash, catg, image, auther, translator, delegate) {
        this.getMaxBid((err, res) => {
            console.log("find max")
            console.log(res)
            db.collection("model_auther").findOne({ aid: auther }, (err, auther_res) => {
                console.log("auther ", auther_res)
                db.collection("model_translator").findOne({ tid: translator }, (err, translator_res) => {
                    console.log("auther ", translator_res)
                    let data = new BookSchema({
                        name: name,
                        desc: desc,
                        image: image,
                        fileName: hash,
                        catg: catg,
                        auther: auther_res._id,
                        translator: translator_res._id,
                        bid: res
                    })
                    db.collection("model_books").insertOne(data, (err, res) => {
                        console.log(err)
                        if (delegate != null) {
                            console.log("insert")
                            delegate(err, res)
                        }
                    })

                })
            })
        })
    }

    getMaxBid(delegate) {
        CategorySchema.find({}).sort({ "bid": -1 }).limit(1).exec((err, res) => {
            console.log
            if (err === null) {
                if (res.length > 0) {
                    const newUid = res[0].bid + 1
                    delegate(null, newUid)
                } else {
                    delegate(null, 101)
                }
            } else {
                delegate(null, 101)
            }
        })
    }
    // +++++++++++++++++++++ AUTHER +++++++++++++++++++++
    getAutherList(delegate) {
        AutherSchema.find({}).exec(function (err, res) {
            delegate(err, res)
        })
    }

    insertAuther(name, desc, image, delegate) {
        this.getMaxAid((err, res) => {
            console.log("find max")
            console.log(res)
            let data = new AutherSchema({
                name: name,
                desc: desc,
                image: image,
                aid: res
            })
            db.collection("model_auther").insertOne(data, (err, res) => {
                console.log(err)
                if (delegate != null) {
                    console.log("insert")
                    delegate(err, res)
                }
            })
        })
    }

    getMaxAid(delegate) {
        CategorySchema.find({}).sort({ "aid": -1 }).limit(1).exec((err, res) => {
            console.log
            if (err === null) {
                if (res.length > 0) {
                    const newUid = res[0].aid + 1
                    delegate(null, newUid)
                } else {
                    delegate(null, 101)
                }
            } else {
                delegate(null, 101)
            }
        })
    }
    // +++++++++++++++++++++ Translator +++++++++++++++++++++
    getTranslatorList(delegate) {
        TranslatorSchema.find({}).exec(function (err, res) {
            delegate(err, res)
        })
    }

    insertTranslator(name, desc, image, delegate) {
        this.getMaxTid((err, res) => {
            console.log("find max")
            console.log(res)
            let data = new TranslatorSchema({
                name: name,
                desc: desc,
                image: image,
                tid: res
            })
            db.collection("model_translator").insertOne(data, (err, res) => {
                console.log(err)
                if (delegate != null) {
                    console.log("insert")
                    delegate(err, res)
                }
            })
        })
    }

    getMaxTid(delegate) {
        CategorySchema.find({}).sort({ "tid": -1 }).limit(1).exec((err, res) => {
            console.log
            if (err === null) {
                if (res.length > 0) {
                    const newUid = res[0].tid + 1
                    delegate(null, newUid)
                } else {
                    delegate(null, 101)
                }
            } else {
                delegate(null, 101)
            }
        })
    }

    // +++++++++++++++++++++ Category +++++++++++++++++++++
    getCategoryList(delegate) {
        CategorySchema.find({}).exec(function (err, res) {
            delegate(err, res)
        })
    }

    insertCategory(name, desc, image, delegate) {
        this.getMaxCid((err, res) => {
            console.log("find max")
            console.log(res)
            let data = new CategorySchema({
                name: name,
                desc: desc,
                image: image,
                cid: res
            })
            db.collection("model_catg").insertOne(data, (err, res) => {
                console.log(err)
                if (delegate != null) {
                    console.log("insert")
                    delegate(err, res)
                }
            })
        })
    }

    getMaxCid(delegate) {
        CategorySchema.find({}).sort({ "cid": -1 }).limit(1).exec((err, res) => {
            console.log
            if (err === null) {
                if (res.length > 0) {
                    const newUid = res[0].cid + 1
                    delegate(null, newUid)
                } else {
                    delegate(null, 101)
                }
            } else {
                delegate(null, 101)
            }
        })
    }

    init() {
        db = dbs.Get();
    }
}

module.exports = StorageHandler
