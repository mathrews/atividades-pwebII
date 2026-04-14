var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/signin', (req, res) => {
  res.send('Página: /signin');
});

router.get('/signup', (req, res) => {
  res.send('Página: /signup');
});

router.post('/data', (req, res) => {
  res.send('Dados recebidos via POST em /data');
});

module.exports = router;
