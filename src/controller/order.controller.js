// Controller para gerenciar pedidos
class OrderController {
  constructor(orderService) {
    this.orderService = orderService;
  }

  async create(req, res) {
    try {
      const order = await this.orderService.createOrder(req.body);
      return res.status(201).json(order);
    } catch (error) {
      console.error('Error creating order:', error);
      return res.status(400).json({
        error: error.message || 'Erro ao criar pedido'
      });
    }
  }

  async findById(req, res) {
    try {
      const { orderId } = req.params;
      const order = await this.orderService.getOrderById(orderId);
      return res.status(200).json(order);
    } catch (error) {
      console.error('Error finding order:', error);
      const statusCode = error.message.includes('nao encontrado') ? 404 : 400;
      return res.status(statusCode).json({
        error: error.message || 'Erro ao buscar pedido'
      });
    }
  }

  async findAll(req, res) {
    try {
      const orders = await this.orderService.getAllOrders();
      return res.status(200).json(orders);
    } catch (error) {
      console.error('Error listing orders:', error);
      return res.status(400).json({
        error: error.message || 'Erro ao listar pedidos'
      });
    }
  }

  async update(req, res) {
    try {
      const { orderId } = req.params;
      const order = await this.orderService.updateOrder(orderId, req.body);
      return res.status(200).json(order);
    } catch (error) {
      console.error('Error updating order:', error);
      const statusCode = error.message.includes('nao encontrado') ? 404 : 400;
      return res.status(statusCode).json({
        error: error.message || 'Erro ao atualizar pedido'
      });
    }
  }

  async delete(req, res) {
    try {
      const { orderId } = req.params;
      const result = await this.orderService.deleteOrder(orderId);
      return res.status(200).json(result);
    } catch (error) {
      console.error('Error deleting order:', error);
      const statusCode = error.message.includes('nao encontrado') ? 404 : 400;
      return res.status(statusCode).json({
        error: error.message || 'Erro ao deletar pedido'
      });
    }
  }
}

module.exports = { OrderController };
