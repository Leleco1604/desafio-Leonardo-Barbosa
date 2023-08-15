class CaixaDaLanchonete {
  cardapio = {
    cafe: { descricao: 'Café', valor: 3.0 },
    chantily: { descricao: 'Chantily (extra do Café)', valor: 1.5 },
    suco: { descricao: 'Suco Natural', valor: 6.2 },
    sanduiche: { descricao: 'Sanduíche', valor: 6.5 },
    queijo: { descricao: 'Queijo (extra do Sanduíche)', valor: 2.0 },
    salgado: { descricao: 'Salgado', valor: 7.25 },
    combo1: { descricao: '1 Suco e 1 Sanduíche', valor: 9.5 },
    combo2: { descricao: '1 Café e 1 Sanduíche', valor: 7.5 },
  };

  formasDePagamento = ['dinheiro', 'debito', 'credito'];

  calcularValorDaCompra(formaDePagamento, itens) {
    if (!this.formasDePagamento.includes(formaDePagamento)) {
      return 'Forma de pagamento inválida!';
    }

    let valorTotal = 0;
    let temPrincipal = false;
    let temExtra = false;

    for (const item of itens) {
      const [codigo, quantidade] = item.split(',');
      
      if (!this.cardapio[codigo]) {
        return 'Item inválido!';
      }

      valorTotal += this.cardapio[codigo].valor * quantidade;

      if (codigo !== 'chantily' && codigo !== 'queijo') {
        temPrincipal = true;
      }

      if (codigo === 'chantily' || codigo === 'queijo') {
        temExtra = true;
      }
    }

    if (!temPrincipal && temExtra) {
      return 'Item extra não pode ser pedido sem o principal';
    }

    if (itens.length === 0) {
      return 'Não há itens no carrinho de compra!';
    }

    if (itens.length === 0) {
      return 'Quantidade inválida!';
    }

    if (formaDePagamento === 'dinheiro') {
      valorTotal *= 0.95; // Desconto de 5% para pagamento em dinheiro
    } else if (formaDePagamento === 'credito') {
      valorTotal *= 1.03; // Acréscimo de 3% para pagamento a crédito
    }

    return `R$ ${valorTotal.toFixed(2).replace('.', ',')}`;
  }
}

// Exemplo de uso
const caixa = new CaixaDaLanchonete();
const itensDoPedido = ['cafe,1', 'chantily,1'];
const formaDePagamento = 'debito';

const valorTotal = caixa.calcularValorDaCompra(formaDePagamento, itensDoPedido);
console.log('Valor total da compra:', valorTotal);
