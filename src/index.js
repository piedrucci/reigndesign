const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();

const routes = require('./routes/index');
const articleRoutes = require('./routes/articles');

app.set('port', process.env.PORT || 3000);
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'dist'));

// middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// routes
app.use(routes);
app.use('/api', articleRoutes);

// static files
app.use(express.static(path.join(__dirname, 'dist')));

app.listen(app.get('port'), () => {
  console.log('server listening on port ', app.get('port'));
});
