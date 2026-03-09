// Interface para o repositório de pedidos
class OrderRepository {
  async create(order) {
    throw new Error('Method not implemented');
  }

  async findById(orderId) {
    throw new Error('Method not implemented');
  }

  async findAll() {
    throw new Error('Method not implemented');
  }

  async update(orderId, order) {
    throw new Error('Method not implemented');
  }

  async delete(orderId) {
    throw new Error('Method not implemented');
  }
}

module.exports = { OrderRepository };

