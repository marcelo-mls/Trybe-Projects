db.produtos
  .find(
    { $or: [{ vendidos: 85 }, { curtidas: 36 }] },
    { _id: 0, nome: 1, vendidos: 1, curtidas: 1 },
  );