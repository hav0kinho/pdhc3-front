import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

const DetalhesVendaScreen = ({
  route,
  navigation,
}: {
  route: any;
  navigation: any;
}) => {
  const { vendaId } = route.params;
  const venda = useSelector((state: RootState) =>
    state.vendas.lista.find((v) => v.id === vendaId)
  );

  const buscarProdutoPorId = (id: string) => {
    return useSelector((state: RootState) =>
      state.produtos.lista.find((produto) => produto.id === id)
    );
  };

  if (!venda) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Venda não encontrada!</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Detalhes da Venda</Text>
      <Text>Valor Total: R$ {venda.valorTotal.toFixed(2)}</Text>
      <Text>Data: {new Date(venda.dataVenda).toLocaleDateString()}</Text>
      <Text>Produtos Vendidos:</Text>
      {venda.produtosVendidos.map((produtoVendido, index) => (
        <Text key={index}>
          {buscarProdutoPorId(produtoVendido.produtoId)?.nome || "<null>"} -
          Quantidade: {produtoVendido.quantidadeVendida}
        </Text>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f8f8f8",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  errorText: {
    fontSize: 18,
    color: "red",
  },
});

export default DetalhesVendaScreen;
