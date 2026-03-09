const swaggerUi = require('swagger-ui-express');

const swaggerSpec = {
  openapi: '3.0.3',
  info: {
    title: 'Jitterbit Orders API',
    version: '1.0.0',
    description: 'Documentacao da API de pedidos (desafio Jitterbit).'
  },
  servers: [
    {
      url: 'http://localhost:3000',
      description: 'Servidor local'
    }
  ],
  tags: [
    { name: 'Order', description: 'Operacoes de pedidos' },
    { name: 'Health', description: 'Status da aplicacao' }
  ],
  paths: {
    '/health': {
      get: {
        tags: ['Health'],
        summary: 'Health check',
        responses: {
          200: {
            description: 'Aplicacao em execucao'
          }
        }
      }
    },
    '/order': {
      post: {
        tags: ['Order'],
        summary: 'Criar novo pedido',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/CreateOrderInput' }
            }
          }
        },
        responses: {
          201: {
            description: 'Pedido criado',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/OrderResponse' }
              }
            }
          },
          400: {
            description: 'Erro de validacao'
          }
        }
      }
    },
    '/order/list': {
      get: {
        tags: ['Order'],
        summary: 'Listar pedidos',
        responses: {
          200: {
            description: 'Lista de pedidos',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: { $ref: '#/components/schemas/OrderResponse' }
                }
              }
            }
          }
        }
      }
    },
    '/order/{orderId}': {
      get: {
        tags: ['Order'],
        summary: 'Buscar pedido por ID',
        parameters: [
          {
            name: 'orderId',
            in: 'path',
            required: true,
            schema: { type: 'string' }
          }
        ],
        responses: {
          200: {
            description: 'Pedido encontrado',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/OrderResponse' }
              }
            }
          },
          404: { description: 'Pedido nao encontrado' }
        }
      },
      put: {
        tags: ['Order'],
        summary: 'Atualizar pedido',
        parameters: [
          {
            name: 'orderId',
            in: 'path',
            required: true,
            schema: { type: 'string' }
          }
        ],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/UpdateOrderInput' }
            }
          }
        },
        responses: {
          200: { description: 'Pedido atualizado' },
          404: { description: 'Pedido nao encontrado' }
        }
      },
      delete: {
        tags: ['Order'],
        summary: 'Deletar pedido',
        parameters: [
          {
            name: 'orderId',
            in: 'path',
            required: true,
            schema: { type: 'string' }
          }
        ],
        responses: {
          200: { description: 'Pedido deletado' },
          404: { description: 'Pedido nao encontrado' }
        }
      }
    }
  },
  components: {
    schemas: {
      CreateOrderItemInput: {
        type: 'object',
        required: ['idItem', 'quantidadeItem', 'valorItem'],
        properties: {
          idItem: { type: 'string', example: '2434' },
          quantidadeItem: { type: 'integer', example: 1 },
          valorItem: { type: 'integer', example: 1000 }
        }
      },
      CreateOrderInput: {
        type: 'object',
        required: ['numeroPedido', 'valorTotal', 'dataCriacao', 'items'],
        properties: {
          numeroPedido: { type: 'string', example: 'v10089015vdb-01' },
          valorTotal: { type: 'integer', example: 10000 },
          dataCriacao: { type: 'string', format: 'date-time' },
          items: {
            type: 'array',
            items: { $ref: '#/components/schemas/CreateOrderItemInput' }
          }
        }
      },
      UpdateOrderInput: {
        type: 'object',
        properties: {
          valorTotal: { type: 'integer', example: 15000 },
          items: {
            type: 'array',
            items: { $ref: '#/components/schemas/CreateOrderItemInput' }
          }
        }
      },
      OrderItemResponse: {
        type: 'object',
        properties: {
          productId: { type: 'integer', example: 2434 },
          quantity: { type: 'integer', example: 1 },
          price: { type: 'integer', example: 1000 }
        }
      },
      OrderResponse: {
        type: 'object',
        properties: {
          orderId: { type: 'string', example: 'v10089015vdb' },
          value: { type: 'integer', example: 10000 },
          creationDate: { type: 'string', format: 'date-time' },
          items: {
            type: 'array',
            items: { $ref: '#/components/schemas/OrderItemResponse' }
          }
        }
      }
    }
  }
};

module.exports = {
  swaggerUi,
  swaggerSpec
};

