import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Produto from "../../models/Produto";

interface ProdutoCarrinho extends Produto {
  quantidadeCarrinho: number;
}

interface CarrinhoState {
  itens: ProdutoCarrinho[];
}

const initialState: CarrinhoState = {
  itens: [],
};

const carrinhoSlice = createSlice({
  name: "carrinho",
  initialState,
  reducers: {
    adicionarAoCarrinho(state, action: PayloadAction<Produto>) {
      const produto = action.payload;
      const itemExistente = state.itens.find((item) => item.id === produto.id);

      if (!itemExistente) {
        // Adicionar novo produto ao carrinho
        state.itens.push({ ...produto, quantidadeCarrinho: 1 });
      } else {
        // Incrementar a quantidade no carrinho
        itemExistente.quantidadeCarrinho++;
      }
    },
    removerDoCarrinho(state, action: PayloadAction<string>) {
      const id = action.payload;
      const itemIndex = state.itens.findIndex((item) => item.id === id);

      if (itemIndex >= 0) {
        const item = state.itens[itemIndex];
        // Remove o item do carrinho se a quantidade no carrinho for 1
        if (item.quantidadeCarrinho === 1) {
          state.itens.splice(itemIndex, 1);
        } else {
          // Diminui a quantidade no carrinho
          item.quantidadeCarrinho--;
        }
      }
    },
    limparCarrinho(state) {
      // Retorna os itens ao estoque ao limpar o carrinho
      state.itens.forEach((item) => {
        item.quantidade += item.quantidadeCarrinho;
      });
      state.itens = [];
    },
  },
});

export const { adicionarAoCarrinho, limparCarrinho, removerDoCarrinho } =
  carrinhoSlice.actions;

export default carrinhoSlice.reducer;
