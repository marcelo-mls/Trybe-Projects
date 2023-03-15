const allProductsResponse = [
  { id: 1, name: 'Martelo de Thor' },
  { id: 2, name: 'Traje de encolhimento' },
  { id: 3, name: 'Escudo do Capitão América' },
];

const allSalesResponse = [
  {
    saleId: 1,
    date: "2022-10-18T02:05:40.000Z",
    productId: 1,
    quantity: 5
  },
  {
    saleId: 1,
    date: "2022-10-18T02:05:40.000Z",
    productId: 2,
    quantity: 10
  },
  {
    saleId: 2,
    date: "2022-10-18T02:05:40.000Z",
    productId: 3,
    quantity: 15
  }
]

const salesResponseById = [
  {
    date: "2022-10-18T02:05:40.000Z",
    productId: 3,
    quantity: 15
  }
]



module.exports = {
  allProductsResponse,
  allSalesResponse,
  salesResponseById,
};