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
    { name: 'Auth', description: 'Autenticacao e autorizacao' },
    { name: 'Order', description: 'Operacoes de pedidos' },
    { name: 'Health', description: 'Status da aplicacao' }
  ],
  paths: {
    '/auth/register': {
      post: {
        tags: ['Auth'],
        summary: 'Registrar novo usuario',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/AuthInput' }
            }
          }
        },
        responses: {
          201: {
            description: 'Usuario registrado com sucesso',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/AuthResponse' }
              }
            }
          },
          400: {
            description: 'Erro de validacao'
          }
        }
      }
    },
    '/auth/login': {
      post: {
        tags: ['Auth'],
        summary: 'Realizar login',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/AuthInput' }
            }
          }
        },
        responses: {
          200: {
            description: 'Login realizado com sucesso',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/AuthResponse' }
              }
            }
          },
          401: {
            description: 'Credenciais invalidas'
          }
        }
      }
    },
    '/auth/me': {
      get: {
        tags: ['Auth'],
        summary: 'Obter dados do usuario autenticado',
        security: [{ BearerAuth: [] }],
        responses: {
          200: {
            description: 'Dados do usuario',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/UserResponse' }
              }
            }
          },
          401: {
            description: 'Token nao fornecido ou invalido'
          }
        }
      }
    },
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
        security: [{ BearerAuth: [] }],
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
          },
          401: {
            description: 'Token nao fornecido ou invalido'
          }
        }
      }
    },
    '/order/list': {
      get: {
        tags: ['Order'],
        summary: 'Listar pedidos',
        security: [{ BearerAuth: [] }],
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
          },
          401: {
            description: 'Token nao fornecido ou invalido'
          }
        }
      }
    },
    '/order/{orderId}': {
      get: {
        tags: ['Order'],
        summary: 'Buscar pedido por ID',
        security: [{ BearerAuth: [] }],
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
          401: {
            description: 'Token nao fornecido ou invalido'
          },
          404: { description: 'Pedido nao encontrado' }
        }
      },
      put: {
        tags: ['Order'],
        summary: 'Atualizar pedido',
        security: [{ BearerAuth: [] }],
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
          401: {
            description: 'Token nao fornecido ou invalido'
          },
          404: { description: 'Pedido nao encontrado' }
        }
      },
      delete: {
        tags: ['Order'],
        summary: 'Deletar pedido',
        security: [{ BearerAuth: [] }],
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
          401: {
            description: 'Token nao fornecido ou invalido'
          },
          404: { description: 'Pedido nao encontrado' }
        }
      }
    }
  },
  components: {
    securitySchemes: {
      BearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        description: 'Token JWT obtido atraves do login'
      }
    },
    schemas: {
      AuthInput: {
        type: 'object',
        required: ['email', 'password'],
        properties: {
          email: { type: 'string', format: 'email', example: 'user@example.com' },
          password: { type: 'string', example: 'senha123' }
        }
      },
      AuthResponse: {
        type: 'object',
        properties: {
          token: { type: 'string', example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' },
          userId: { type: 'string', example: '123' },
          email: { type: 'string', format: 'email', example: 'user@example.com' }
        }
      },
      UserResponse: {
        type: 'object',
        properties: {
          userId: { type: 'string', example: '123' },
          email: { type: 'string', format: 'email', example: 'user@example.com' },
          createdAt: { type: 'string', format: 'date-time' }
        }
      },
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

