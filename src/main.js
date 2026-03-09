require('dotenv').config();
const express = require('express');
const { OrderController } = require('./controller/order.controller');
const { orderService } = require('./module/order.module');
const { swaggerUi, swaggerSpec } = require('./config/swagger');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.get('/docs-json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});

const orderController = new OrderController(orderService);

// Rotas de pedidos
app.post('/order', (req, res) => orderController.create(req, res));

app.get('/order/list', (req, res) => orderController.findAll(req, res));

app.get('/order/:orderId', (req, res) => orderController.findById(req, res));

app.put('/order/:orderId', (req, res) => orderController.update(req, res));

app.delete('/order/:orderId', (req, res) => orderController.delete(req, res));

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', timestamp: new Date().toISOString() });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Rota não encontrada' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ error: 'Erro interno do servidor' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
  console.log(`API disponível em http://localhost:${PORT}`);
  console.log(`SWAGGER UI  http://localhost:${PORT}/docs`);
  console.log(`   OPENAPI     http://localhost:${PORT}/docs-json`);
  console.log(`   POST   http://localhost:${PORT}/order`);
  console.log(`   GET    http://localhost:${PORT}/order/:orderId`);
  console.log(`   GET    http://localhost:${PORT}/order/list`);
  console.log(`   PUT    http://localhost:${PORT}/order/:orderId`);
  console.log(`   DELETE http://localhost:${PORT}/order/:orderId`);
});

process.on('SIGINT', async () => {
  console.log('\n Encerrando servidor...');
  process.exit(0);
});

process.on('SIGTERM', async () => {
  console.log('\nEncerrando servidor...');
  process.exit(0);
});
