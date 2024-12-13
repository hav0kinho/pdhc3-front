import { StyleSheet, Text, View } from "react-native";

const ProdutosAgricolasCard = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.productText}>Produtos de Agricultura</Text>
      <Text style={styles.productSubtitle}>
        Quantidade e Preços dos produtos
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FBFBE0",
    width: 200,
    height: 125,
    borderRadius: 10,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  productText: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
  },
  productSubtitle: {
    fontSize: 16,
  },
});

export default ProdutosAgricolasCard;
