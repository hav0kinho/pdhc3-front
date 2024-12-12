import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
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
    <ScrollView style={styles.container}>
      <Text style={styles.title}>
        Detalhes da Venda -{" "}
        <Text style={styles.valorTotal}>R$ {venda.valorTotal.toFixed(2)}</Text>
      </Text>
      <Text style={styles.data}>
        Data: {new Date(venda.dataVenda).toLocaleDateString()}
      </Text>
      <View style={styles.linha}></View>
      {venda.produtosVendidos.map((produtoVendido, index) => (
        <View key={index} style={styles.produto}>
          <Text style={styles.produtoVendido}>
            🏷️{" "}
            {buscarProdutoPorId(produtoVendido.produtoId)?.nome || "<Sem Nome>"}
          </Text>
          <View>
            <Text style={styles.valorPagoProduto}>
              Total:{" "}
              <Text style={styles.valorTotalProduto}>
                R${produtoVendido.valorPago.toFixed(2)}
              </Text>
            </Text>
            <Text style={styles.quantidadeVendida}>
              Quantidade: {produtoVendido.quantidadeVendida}
            </Text>
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f8f8f8",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
  },
  errorText: {
    fontSize: 18,
    color: "red",
  },
  valorTotal: {
    fontWeight: "bold",
    color: "#4b7258",
    marginBottom: 10,
  },
  data: {
    fontSize: 16,
    marginBottom: 10,
  },
  produtoVendido: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  produto: {
    fontSize: 16,
    marginBottom: 5,
  },
  linha: {
    height: 1,
    backgroundColor: "#ccc",
    marginBottom: 10,
    marginTop: 10,
  },
  valorPagoProduto: {
    fontSize: 16,
  },
  quantidadeVendida: {
    fontSize: 16,
  },
  valorTotalProduto: {
    fontWeight: "bold",
    color: "#4b7258",
  },
});

export default DetalhesVendaScreen;
