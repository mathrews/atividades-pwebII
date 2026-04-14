const express = require('express');
const app = express();
const PORT = 3000;

app.use((req, res, next) => {
  console.log(`Acesso: ${req.method} ${req.url}`);
  next();
});

const routeMiddleware = (rota) => {
  return (req, res, next) => {
    console.log(`Middleware da rota: ${rota}`);
    next();
  };
};

app.get('/', routeMiddleware('/'), (req, res) => {
  res.send('Página: /');
});

app.get('/about', routeMiddleware('/about'), (req, res) => {
  res.send('Página: /about');
});

app.get('/data', routeMiddleware('/data'), (req, res) => {
  res.send('Página: /data (GET)');
});

app.get('/users', routeMiddleware('/users'), (req, res) => {
  res.send('Página: /users');
});

app.get('/signin', routeMiddleware('/signin'), (req, res) => {
  res.send('Página: /signin');
});

app.get('/signup', routeMiddleware('/signup'), (req, res) => {
  res.send('Página: /signup');
});

app.get('/users/:userid', routeMiddleware('/users/:userid'), (req, res) => {
  const { userid } = req.params;

  if (!userid) {
    return res.redirect('/signup');
  }

  res.send(`Bem-vindo, usuário ${userid}!`);
});

app.post('/data', routeMiddleware('/data POST'), (req, res) => {
  res.send('Dados recebidos via POST em /data');
});

app.use((req, res) => {
  res.status(404).send(`
    <h1>404 - Página não encontrada</h1>
    <a href="/">Voltar para o início</a>
  `);
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});