const express = require("express");
const app = express();
const { MongoClient } = require("mongodb");
require("dotenv").config();
const client = new MongoClient(process.env.URI);
const db = client.db("sample_contacts").collection("contacts");
const contactsDAO = require("./contactsDAO");

app.get("/all", async (req, res) => {
  const docs = await contactsDAO.getContacts(db);
  res.json(docs);
});

app.get("/add/:n/:tel", async (req, res) => {
  const doc = {
    nome: req.params.n,
    numero: req.params.tel,
  };

  const result = await contactsDAO.addContacts(db, doc);

  res.json(result);
});

app.get("/del/:n", async (req, res) => {
  const result = await contactsDAO.delContactsByName(db, req.params.n);

  res.json(result);
});

app.get("/mod/:n/:nome/:numero", async (req, res) => {
  const contact = {
    nome: req.params.nome,
    numero: req.params.numero,
  };

  const result = await contactsDAO.modContactsByNome(db, req.params.n, contact);

  res.json(result);
});

app.listen(3000, () => {
  console.log("Running...");
});
