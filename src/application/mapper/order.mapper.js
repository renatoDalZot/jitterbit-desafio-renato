const { Order } = require('../../domain/model/order.model');
const { Item } = require('../../domain/model/item.model');

// Mapper para converter DTO para modelo do domínio e vice-versa
class OrderMapper {
  static fromCreateDto(createOrderDto) {
    const orderId = createOrderDto.numeroPedido.split('-')[0];

    const items = createOrderDto.items.map(itemDto =>
      new Item(
        parseInt(itemDto.idItem),
        itemDto.quantidadeItem,
        itemDto.valorItem,
        orderId
      )
    );

    return new Order(
      orderId,
      createOrderDto.valorTotal,
      new Date(createOrderDto.dataCriacao),
      items
    );
  }

  static fromUpdateDto(updateOrderDto, orderId) {
    const items = updateOrderDto.items ? updateOrderDto.items.map(itemDto =>
      new Item(
        parseInt(itemDto.idItem),
        itemDto.quantidadeItem,
        itemDto.valorItem,
        orderId
      )
    ) : [];

    return new Order(
      orderId,
      updateOrderDto.valorTotal,
      null, // creationDate is not updated
      items
    );
  }

  static fromPrisma(prismaOrder) {
    const items = prismaOrder.items ? prismaOrder.items.map(prismaItem =>
      new Item(
        prismaItem.productId,
        prismaItem.quantity,
        prismaItem.price,
        prismaItem.orderId,
        prismaItem.id
      )
    ) : [];

    return new Order(
      prismaOrder.orderId,
      prismaOrder.value,
      prismaOrder.creationDate,
      items
    );
  }

  static toPrismaCreate(order) {
    return {
      orderId: order.orderId,
      value: order.value,
      creationDate: order.creationDate,
      items: {
        create: order.items.map(item => ({
          productId: item.productId,
          quantity: item.quantity,
          price: item.price
        }))
      }
    };
  }

  static toPrismaUpdate(order) {
    const data = {};

    if (order.value !== undefined && order.value !== null) {
      data.value = order.value;
    }

    if (order.items && order.items.length > 0) {
      data.items = {
        deleteMany: {}, // Delete all existing items
        create: order.items.map(item => ({
          productId: item.productId,
          quantity: item.quantity,
          price: item.price
        }))
      };
    }

    return data;
  }
}

module.exports = { OrderMapper };

