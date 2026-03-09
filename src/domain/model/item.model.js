// Modelo de Domínio - Entidade Item
class Item {
  constructor(productId, quantity, price, orderId = null, id = null) {
    this.id = id;
    this.orderId = orderId;
    this.productId = productId;
    this.quantity = quantity;
    this.price = price;
  }
}

module.exports = { Item };

