import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Venda from "../../models/Venda";

interface VendasState {
  lista: Venda[];
}

const initialState: VendasState = {
  lista: [],
};

const vendasSlice = createSlice({
  name: "vendas",
  initialState,
  reducers: {
    adicionarVenda(state, action: PayloadAction<Venda>) {
      state.lista.push(action.payload);
    },
    removerVenda(state, action: PayloadAction<string>) {
      state.lista = state.lista.filter((venda) => venda.id !== action.payload);
    },
    atualizarVendas(state, action: PayloadAction<Venda[]>) {
      state.lista = action.payload;
    },
  },
});

export const { adicionarVenda, removerVenda, atualizarVendas } =
  vendasSlice.actions;
export default vendasSlice.reducer;
