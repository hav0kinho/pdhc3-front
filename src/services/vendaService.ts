import Produto from "../models/Produto";
import Venda from "../models/Venda";
import { apiFetch, apiRoutes } from "./api";

type VendaCreate = {
  latitude: number;
  longitude: number;
  dataVenda: string;
  valorTotal: number;
  produtosVendidos: ProdutoVendidoCreate[];
};

type ProdutoVendidoCreate = {
  quantidadeVendida: number;
  valorPago: number;
  produto: string;
};

type ProdutoVendido = {
  id: string;
  quantidadeVendida: number;
  valorPago: number;
  vendaId: string;
  produtoId: string;
  produto: Produto;
};

type VendaGet = {
  id: string;
  latitude: number;
  longitude: number;
  dataVenda: string;
  valorTotal: number;
};

export const getVendas = async (): Promise<Venda[]> => {
  try {
    const data = await apiFetch(apiRoutes.venda, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const vendas: Venda[] = [];
    data.map((venda: Venda) => {
      const produtosVendidos = venda.produtosVendidos.map((produto) => ({
        id: produto.id,
        quantidadeVendida: produto.quantidadeVendida,
        valorPago: Number(produto.valorPago),
        vendaId: produto.vendaId,
        produtoId: produto.produtoId,
      }));

      const novaVenda: Venda = {
        id: venda.id,
        latitude: venda.latitude,
        longitude: venda.longitude,
        dataVenda: new Date(venda.dataVenda).toString(),
        valorTotal: Number(venda.valorTotal),
        produtosVendidos,
      };

      vendas.push(novaVenda);
    });
    return vendas;
  } catch (error) {
    console.error("Erro ao buscar os produtos do back: " + error);
    return [];
  }
};

export const createVenda = async (
  venda: VendaCreate
): Promise<Venda | null> => {
  try {
    const dataVenda: VendaGet = await apiFetch(apiRoutes.venda, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(venda),
    });

    console.log("Venda Criada com Sucesso");

    const dataProdutosVendidos: ProdutoVendido[] = await apiFetch(
      `${apiRoutes.produtosVenda}/${dataVenda.id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    console.log("Produtos da Venda Resgatados com sucesso");

    console.log("Criando Produtos Vendidos");
    console.log(dataProdutosVendidos);
    const produtosVendidos = dataProdutosVendidos.map((produto) => ({
      id: produto.id,
      quantidadeVendida: Number(produto.quantidadeVendida),
      valorPago: Number(produto.valorPago),
      vendaId: produto.vendaId,
      produtoId: produto.produtoId,
    }));

    console.log("Criando Nova Venda");

    const novaVenda: Venda = {
      id: dataVenda.id,
      latitude: dataVenda.latitude,
      longitude: dataVenda.longitude,
      dataVenda: new Date(dataVenda.dataVenda).toString(),
      valorTotal: Number(dataVenda.valorTotal),
      produtosVendidos,
    };

    console.log("retornando nova venda");
    return novaVenda;
  } catch (error) {
    console.error("Erro ao criar a venda: " + error);
    return null;
  }
};
