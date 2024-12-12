import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Produto from "../../models/Produto";

interface ProdutosState {
  lista: Produto[];
}

interface ProdutoCarrinho extends Produto {
  quantidadeCarrinho: number;
}

const initialState: ProdutosState = {
  lista: [],
};

const produtosSlice = createSlice({
  name: "produtos",
  initialState,
  reducers: {
    adicionarProduto(state, action: PayloadAction<Produto>) {
      state.lista.push(action.payload);
    },
    removerProduto(state, action: PayloadAction<string>) {
      state.lista = state.lista.filter(
        (produto) => produto.id !== action.payload
      );
    },
    decrementarEstoque(state, action: PayloadAction<{ id: string }>) {
      const produto = state.lista.find(
        (produto) => produto.id === action.payload.id
      );
      if (produto && produto.quantidade > 0) {
        produto.quantidade--; // Reduz o estoque
      }
    },
    incrementarEstoque(state, action: PayloadAction<{ id: string }>) {
      const produto = state.lista.find(
        (produto) => produto.id === action.payload.id
      );
      if (produto) {
        produto.quantidade++; // Reabastece o estoque
      }
    },
    incrementarEstoquesDosProdutos(
      state,
      action: PayloadAction<ProdutoCarrinho[]>
    ) {
      action.payload.forEach((produto) => {
        const produtoEstoque = state.lista.find((p) => p.id === produto.id);
        if (produtoEstoque) {
          produtoEstoque.quantidade += produto.quantidadeCarrinho;
        }
      });
    },
    atualizarProdutos(state, action: PayloadAction<Produto[]>) {
      state.lista = action.payload;
    },
  },
});

export const {
  adicionarProduto,
  removerProduto,
  atualizarProdutos,
  incrementarEstoque,
  decrementarEstoque,
  incrementarEstoquesDosProdutos,
} = produtosSlice.actions;
export default produtosSlice.reducer;
