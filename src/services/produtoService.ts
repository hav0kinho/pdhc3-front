import Produto from "../models/Produto";
import { apiFetch, apiRoutes } from "./api";

type ProdutoCreate = {
  nome: string;
  imagemUrl: string;
  precoUnidade: number;
  quantidade: number;
};

// Função para buscar os produtos do back-end
export const getProdutos = async (): Promise<Produto[]> => {
  try {
    const data = await apiFetch(apiRoutes.produto, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const produtos: Produto[] = [];
    data.map((produto: Produto) => {
      produtos.push({
        id: produto.id,
        nome: produto.nome,
        precoUnidade: Number(produto.precoUnidade),
        quantidade: Number(produto.quantidade),
        imagemUrl: produto.imagemUrl,
      });
    }); // Mapeando os produtos para o formato correto
    return produtos;
  } catch (error) {
    console.error("Erro ao buscar os produtos do back: " + error);
    return [];
  }
};

// Função para criar um produto no back-end
export const createProduto = async (produto: ProdutoCreate) => {
  try {
    const data = await apiFetch(apiRoutes.produto, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(produto),
    });

    const produtoCriado: Produto = {
      id: data.id,
      nome: data.nome,
      precoUnidade: Number(data.precoUnidade),
      quantidade: Number(data.quantidade),
      imagemUrl: data.imagemUrl,
    }; // Formatando o produto criado

    console.log("Produto criado:", produtoCriado);
    return produtoCriado;
  } catch (error) {
    console.error("Erro ao criar produto:", error);
    return null;
  }
};
