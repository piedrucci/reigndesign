const router = require('express').Router();
const mongojs = require('mongojs');
const https = require('https');

const db = mongojs('mean-db', ['articles']);
db.on('error', function (err) {
  console.log('database error');
});

https.get('https://hn.algolia.com/api/v1/search_by_date?query=nodejs', (resp) => {
  let data = '';

  resp.on('data', (chunk) => {
    data += chunk;
  });

  // The whole response has been received. Print out the result.
  resp.on('end', () => {
    db.articles.remove({});
    var saveItem = false;
    var newArticle = {};
    var articles = JSON.parse(data).hits;

    articles.forEach(function (item) {
      saveItem = (item.story_title !== null || item.title !== null);

      if (saveItem) {
        newArticle = {
          title: (item.story_title !== null) ? item.story_title : item.title,
          created_at: item.created_at_i,
          author: item.author,
          url: (item.url !== null) ? item.url : item.story_url
        };

        db.articles.save(newArticle, (err, article) => {
          if (err) return next(err);
        });
      }
    });
  });
}).on("error", (err) => {
  console.log("Error: " + err.message);
});

router.get('/articles', (req, res, next) => {
  db.articles.find((err, articles) => {
    if (err) return next(err);
    res.json(articles);
  });
});

router.get('/articles/:id', (req, res, next) => {
  db.articles.findOne({_id: req.params.id}, (err, article) => {
    if (err) return next(err);
    res.json(article);
  });
});


router.post('/articles', (req, res, next) => {
  const article = req.body
});

module.exports = router;