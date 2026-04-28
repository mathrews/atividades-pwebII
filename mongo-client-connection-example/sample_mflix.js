const { MongoClient } = require("mongodb")
require('dotenv').config()
const uri = process.env.URI
const client = new MongoClient(uri)

const findParams = async (client, resultsLimits) => {
  const cursor = client.db('sample_mflix').collection('movies').find({
    year: {$gt: 1950},
    type: "movie"
  }).limit(resultsLimits)

  const results = await cursor.toArray()

  if (results.length > 0) {
    console.log(`Encontrou-se ${results.length} objetos.`)
    results.forEach((result, i) => {
      console.log(`\n${i+1} - Nome: ${result.title}`);
      console.log(`Ano: ${result.year}`)
      console.log(`Plot: ${result.plot}`)
    })
  }
}

const main = async () => {
  await client.connect()

  await findParams(client, 10)

  await client.close()
}

main().catch(console.error)