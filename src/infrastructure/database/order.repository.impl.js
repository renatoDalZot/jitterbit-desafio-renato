const { PrismaClient } = require('@prisma/client');
const { PrismaPg } = require('@prisma/adapter-pg');
const { Pool } = require('pg');
const { OrderRepository } = require('../../domain/repository/order.repository');
const { OrderMapper } = require('../../application/mapper/order.mapper');

class OrderRepositoryImpl extends OrderRepository {
  constructor() {
    super();
    const connectionString = process.env.DATABASE_URL;
    const pool = new Pool({ connectionString });
    const adapter = new PrismaPg(pool);
    this.prisma = new PrismaClient({ adapter });
  }

  async create(order) {
    const prismaData = OrderMapper.toPrismaCreate(order);
    const prismaOrder = await this.prisma.order.create({
      data: prismaData,
      include: {
        items: true
      }
    });
    return OrderMapper.fromPrisma(prismaOrder);
  }

  async findById(orderId) {
    const prismaOrder = await this.prisma.order.findUnique({
      where: { orderId },
      include: {
        items: true
      }
    });

    if (!prismaOrder) {
      return null;
    }

    return OrderMapper.fromPrisma(prismaOrder);
  }

  async findAll() {
    const prismaOrders = await this.prisma.order.findMany({
      include: {
        items: true
      },
      orderBy: {
        creationDate: 'desc'
      }
    });

    return prismaOrders.map(prismaOrder => OrderMapper.fromPrisma(prismaOrder));
  }

  async update(orderId, order) {
    const prismaData = OrderMapper.toPrismaUpdate(order);

    const prismaOrder = await this.prisma.order.update({
      where: { orderId },
      data: prismaData,
      include: {
        items: true
      }
    });

    return OrderMapper.fromPrisma(prismaOrder);
  }

  async delete(orderId) {
    await this.prisma.order.delete({
      where: { orderId }
    });
    return true;
  }

  async disconnect() {
    await this.prisma.$disconnect();
  }
}

module.exports = { OrderRepositoryImpl };
