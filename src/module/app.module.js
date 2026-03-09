const { Module } = require('@nestjs/common');
const { OrderModule } = require('./order.module');

@Module({
  imports: [OrderModule],
  controllers: [],
  providers: []
})
class AppModule {}

module.exports = { AppModule };

