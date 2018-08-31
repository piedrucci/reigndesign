const https = require('https');
const mongojs = require('mongojs');

const db = mongojs('mean-db', ['articles']);
db.on('error', function (err) {
  console.log('database error', err);
});

db.on('connect', function () {
	console.log('database connected')
})

const fetchApiData = () => {
  console.log('fetching data in apiServer...');
  
	return new Promise( resolve => {
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

				let allArticles = [];
				articles.forEach(function (item) {
					saveItem = (item.story_title !== null || item.title !== null);

					if (saveItem) {
						newArticle = {
							title: (item.story_title !== null) ? item.story_title : item.title,
							created_at: item.created_at_i,
							author: item.author,
							url: (item.url !== null) ? item.url : item.story_url
						};
						allArticles.push(newArticle);

						db.articles.save(newArticle, (err, article) => {
							if (err) return next(err);
						});
					}
				});
				console.log('end of register articles');
				// resolve(allArticles);
			});
		}).on("error", (err) => {
			console.log("Error: " + err.message);
		//   resolve([]);
		});
	})
}

module.exports = fetchApiData;
