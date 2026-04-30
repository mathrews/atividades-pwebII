class ContactsDAO {
  static async getContacts(client) {
    try {
      const cursor = await client
        .find()
        .project({
          _id: 0,
        })
        .sort({ nome: 1 })
        .limit(10)
        .toArray();

      return cursor;
    } catch (error) {
      console.log(error);
    }
  }

  static async addContacts(client, contact) {
    try {
      const ok = await client.insertOne(contact);
      if (ok.insertedId === null) {
        return { error: "Erro ao inserir contato" };
      } else {
        return ok;
      }
    } catch (error) {
      console.log(error);
    }
  }

  static async delContactsByName(client, nome_) {
    try {
      const ok = await client.deleteOne({ nome: nome_ });
      return ok;
    } catch (error) {
      console.log(error);
    }
  }

  static async modContactsByNome(client, nome_, contact) {
    try {
      const ok = await client.findOneAndUpdate(
        {
          nome: nome_,
        },
        {
          $set: contact,
        },
        {
          returnNewDocument: true,
        },
      );

      if (!ok) {
        return { error: "Erro ao atualizar telefone" };
      } else {
        return ok;
      }
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = ContactsDAO;
