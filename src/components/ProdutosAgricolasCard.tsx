import { StyleSheet, Text, View } from "react-native";

const ProdutosAgricolasCard = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.productText}>Produtos de Agricultura</Text>
      <Text>Quantidade e Preços dos produtos</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FBFBE0",
    width: 250,
    height: 150,
    borderRadius: 10,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  productText: {
    fontSize: 36,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default ProdutosAgricolasCard;
