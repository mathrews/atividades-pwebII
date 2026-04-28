const { MongoClient } = require("mongodb")
require('dotenv').config()

const uri = process.env.URI
const client = new MongoClient(uri)

const listDBs = async (client) => {
  try {
    const admin = client.db().admin();

    const result = await admin.listDatabases();

    if (!result || !result.databases) {
      console.log("Não foi possível obter a lista de databases.");
      return;
    }

    console.log("Databases:");

    let totalSize = 0;

    result.databases.forEach(db => {
      const sizeMB = (db.sizeOnDisk / (1024 * 1024)).toFixed(2);

      console.log(`- ${db.name}`);
      console.log(`  ↳ sizeOnDisk: ${sizeMB} MB`);
      console.log(`  ↳ empty: ${db.empty}`);

      totalSize += db.sizeOnDisk;
    });

    const totalSizeMB = (totalSize / (1024 * 1024)).toFixed(2);
    console.log("\nTamanho total do cluster:");
    console.log(`${totalSizeMB} MB`);

  } catch (err) {
    console.error("Erro ao listar databases:", err);
  }
};

const main = async () => {
  try {
    console.log(uri);
    await client.connect()
    const adminDb = client.db("admin");

    const status = await adminDb.command({ replSetGetStatus: 1 });

    status.members.forEach(member => {
      console.log(`- ${member.name} (${member.stateStr})\n`);
    });

    await listDBs(client)
  } catch(e) {
    console.log(e);
  } finally {
    await client.close()
  }
}


main()