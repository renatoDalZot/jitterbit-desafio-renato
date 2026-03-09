const { OrderService } = require('../application/service/order.service');
const { OrderRepositoryImpl } = require('../infrastructure/database/order.repository.impl');

const orderRepository = new OrderRepositoryImpl();
const orderService = new OrderService(orderRepository);

module.exports = { orderRepository, orderService };
