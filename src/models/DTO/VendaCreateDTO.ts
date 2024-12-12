export type VendaCreateDTO = {
  latitude: number;
  longitude: number;
  dataVenda: string;
  valorTotal: number;
  produtosVendidos: {
    quantidadeVendida: number;
    valorPago: number;
    produto: string;
  }[];
};
