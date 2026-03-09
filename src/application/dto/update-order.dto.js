// DTO para atualização do pedido
class UpdateOrderDto {
  constructor(data) {
    this.valorTotal = data.valorTotal;
    this.items = data.items || [];
  }

  //Validação dos campos do pedido
  validate() {
    if (this.valorTotal !== undefined && this.valorTotal === null) {
      throw new Error('valorTotal inválido');
    }

    if (this.items && this.items.length > 0) {
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
    }

    return true;
  }
}

module.exports = { UpdateOrderDto };

