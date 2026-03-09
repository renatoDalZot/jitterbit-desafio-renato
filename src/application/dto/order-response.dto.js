// DTO para resposta do pedido
class OrderResponseDto {
  constructor(order) {
    this.orderId = order.orderId;
    this.value = order.value;
    this.creationDate = order.creationDate;
    this.items = order.items ? order.items.map(item => ({
      productId: item.productId,
      quantity: item.quantity,
      price: item.price
    })) : [];
  }
}

module.exports = { OrderResponseDto };

