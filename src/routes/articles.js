const router = require('express').Router();
const mongojs = require('mongojs');

const db = mongojs('mean-db', ['articles']);
db.on('error', function (err) {
  console.log('database error', err);
});

db.on('connect', function () {
	console.log('database connected')
})

const getArticles = () => {
  console.log('getting list of articles...');
  let response = {
    error: false,
    result: []
  }

  return new Promise( resolve => {
    db.articles.find((err, articles) => {
      response = {
        error: err,
        result: articles
      };

      resolve(response);
    });
  })
}

router.get('/articles', (req, res, next) => {
  getArticles().then((data) => {
    const articlesCount = data.result.length;
    res.json(data);
  });
});

router.delete('/articles/:id', (req, res, next) => {
  const id = req.params.id || null;
  var responseInfo = {
    success: true,
    result: null
  }

  if (id !== null) {
    db.articles.remove({_id: mongojs.ObjectId(id)}, true, (err, result) => {
      if (err) {
        responseInfo.success = false;

        return next(err);
      }
      responseInfo.result = result;
    });
  } else {
    responseInfo.success = false;
  }

  res.json(responseInfo);
});

router.post('/articles', (req, res, next) => {
  const article = req.body
});

module.exports = router;