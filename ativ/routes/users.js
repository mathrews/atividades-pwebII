var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/users', function(req, res, next) {
  res.send('usuarios');
});

router.get('/users/:userid', function(req, res, next) {
  const { userid } = req.params;

  if (!userid) {
    return res.redirect('/signup');
  }

  res.send(`Bem-vindo, usuário ${userid}!`);
});



module.exports = router;
