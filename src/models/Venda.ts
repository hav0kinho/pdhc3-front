type Venda = {
  id: string;
  latitude: number;
  longitude: number;
  dataVenda: string;
  valorTotal: number;
  produtosVendidos: {
    id: string;
    quantidadeVendida: number;
    valorPago: number;
    vendaId: string;
    produtoId: string;
  }[];
};

export default Venda;
