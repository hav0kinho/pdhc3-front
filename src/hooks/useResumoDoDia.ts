import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

// Hook para calcular o resumo das vendas do dia
export const useResumoDoDia = () => {
  const vendas = useSelector((state: RootState) => state.vendas.lista);

  // Data de hoje no formato ISO (somente a parte da data: YYYY-MM-DD)
  const hojeISO = new Date().toISOString().slice(0, 10);
  // Filtrar vendas do dia
  const vendasDoDia = vendas.filter((venda) =>
    ehMesmaDataISO(
      new Date(venda.dataVenda).toISOString().slice(0, 10),
      hojeISO
    )
  );

  // Calcular valor total das vendas do dia
  const valorTotal = vendasDoDia.reduce(
    (acc, venda) => acc + venda.valorTotal,
    0
  );

  // Retornar o resumo feito acima
  return {
    vendasDoDia,
    quantidadeVendas: vendasDoDia.length,
    valorTotal,
  };
};

// Comparar duas datas no formato ISO (YYYY-MM-DD)
const ehMesmaDataISO = (dataVenda: string, dataHojeISO: string): boolean => {
  return dataVenda === dataHojeISO;
};
