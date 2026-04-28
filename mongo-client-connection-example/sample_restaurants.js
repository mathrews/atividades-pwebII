const { MongoClient } = require("mongodb")
require('dotenv').config()
const uri = process.env.URI
const client = new MongoClient(uri)

const findRestaurants = async (db) => {
  try {
    const result = await db.collection("restaurants")
      .find({
        "grades.score": { $gt: 80, $lt: 100 }
      })
      .toArray();

    if (!result.length) {
      console.log("Nenhum restaurante encontrado.");
      return;
    }

    console.log("Restaurantes encontrados:");
    result.forEach(r => {
      console.log(`- ${r.name} (${r.borough})`);
    });

  } catch (err) {
    console.error("Erro na consulta:", err);
  }
};

const main = async () => {
  await client.connect()

  await findParams(client, 10)

  await client.close()
}

main().catch(console.error)