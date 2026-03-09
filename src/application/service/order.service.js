const { CreateOrderDto } = require('../dto/create-order.dto');
const { UpdateOrderDto } = require('../dto/update-order.dto');
const { OrderResponseDto } = require('../dto/order-response.dto');
const { OrderMapper } = require('../mapper/order.mapper');

// Serviço de pedido
class OrderService {
  constructor(orderRepository) {
    this.orderRepository = orderRepository;
  }

  async createOrder(data) {
    try {
      const createOrderDto = new CreateOrderDto(data);
      createOrderDto.validate();

      const order = OrderMapper.fromCreateDto(createOrderDto);

      const existingOrder = await this.orderRepository.findById(order.orderId);
      if (existingOrder) {
        throw new Error(`Pedido com ID ${order.orderId} já existe`);
      }

      const savedOrder = await this.orderRepository.create(order);

      return new OrderResponseDto(savedOrder);
    } catch (error) {
      throw error;
    }
  }

  async getOrderById(orderId) {
    try {
      const order = await this.orderRepository.findById(orderId);

      if (!order) {
        throw new Error(`Pedido ${orderId} não encontrado`);
      }

      return new OrderResponseDto(order);
    } catch (error) {
      throw error;
    }
  }

  async getAllOrders() {
    try {
      const orders = await this.orderRepository.findAll();
      return orders.map(order => new OrderResponseDto(order));
    } catch (error) {
      throw error;
    }
  }

  async updateOrder(orderId, data) {
    try {
      const existingOrder = await this.orderRepository.findById(orderId);
      if (!existingOrder) {
        throw new Error(`Pedido ${orderId} não encontrado`);
      }

      const updateOrderDto = new UpdateOrderDto(data);
      updateOrderDto.validate();

      const order = OrderMapper.fromUpdateDto(updateOrderDto, orderId);

      const updatedOrder = await this.orderRepository.update(orderId, order);

      return new OrderResponseDto(updatedOrder);
    } catch (error) {
      throw error;
    }
  }

  async deleteOrder(orderId) {
    try {
      const existingOrder = await this.orderRepository.findById(orderId);
      if (!existingOrder) {
        throw new Error(`Pedido ${orderId} não encontrado`);
      }

      await this.orderRepository.delete(orderId);

      return { message: `Pedido ${orderId} deletado com sucesso` };
    } catch (error) {
      throw error;
    }
  }
}

module.exports = { OrderService };

