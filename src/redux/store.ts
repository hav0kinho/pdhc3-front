import { configureStore } from "@reduxjs/toolkit";
import produtosReducer from "./slices/produtosSlice";
import vendasReducer from "./slices/vendasSlice";
import carrinhoReducer from "./slices/carrinhoSlice";

const store = configureStore({
  reducer: {
    produtos: produtosReducer,
    vendas: vendasReducer,
    carrinho: carrinhoReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
