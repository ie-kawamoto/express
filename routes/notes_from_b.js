var express = require('express');
var router = express.Router();
const cors = require('cors'); // corsミドルウェアを追加

// 接続情報を設定
const { MongoClient } = require("mongodb");
const uri = process.env.MONGODB_URI;

if (!uri || !/^mongodb(\+srv)?:\/\//.test(uri)) {
  throw new Error(
    'MONGODB_URI must be set to a valid MongoDB connection string ' +
    '(starting with "mongodb://" or "mongodb+srv://")'
  );
}
const client = new MongoClient(uri);

// corsミドルウェアを使用
router.use(cors());

router.get('/', async (req, res) => {
// データベース、コレクションを指定
const database = client.db('notes');
const notes = database.collection('notes');


// 全てのドキュメントを取得
const note = await notes.find({}).toArray();

res.json(note);
})

module.exports = router;
