// DTO para criação de pedidos
class CreateOrderDto {
  constructor(data) {
    this.numeroPedido = data.numeroPedido;
    this.valorTotal = data.valorTotal;
    this.dataCriacao = data.dataCriacao;
    this.items = data.items || [];
  }

  // Validação dos campos do pedido
  validate() {
    if (!this.numeroPedido) {
      throw new Error('numeroPedido é obrigatório');
    }
    if (this.valorTotal === undefined || this.valorTotal === null) {
      throw new Error('valorTotal é obrigatório');
    }
    if (!this.dataCriacao) {
      throw new Error('dataCriacao é obrigatório');
    }
    if (!Array.isArray(this.items) || this.items.length === 0) {
      throw new Error('items deve ser um array não vazio');
    }

    // Validação dos itens
    this.items.forEach((item, index) => {
      if (!item.idItem) {
        throw new Error(`Item ${index}: idItem é obrigatório`);
      }
      if (item.quantidadeItem === undefined || item.quantidadeItem === null) {
        throw new Error(`Item ${index}: quantidadeItem é obrigatório`);
      }
      if (item.valorItem === undefined || item.valorItem === null) {
        throw new Error(`Item ${index}: valorItem é obrigatório`);
      }
    });

    return true;
  }
}

module.exports = { CreateOrderDto };

