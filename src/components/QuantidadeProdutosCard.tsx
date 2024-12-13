import { StyleSheet, Text, View } from "react-native";

interface Props {
  quantidadeProdutos: number;
}

// Componente que mostra a quantidade de produtos cadastrados até o momento
const QuantidadeProdutosCard = ({ quantidadeProdutos }: Props) => {
  return (
    <View style={styles.container}>
      <View style={styles.quantidadePill}>
        <Text style={styles.quantidadeText}>Cadastrados</Text>
      </View>
      <View>
        <Text style={styles.quantidadeNumber}>{quantidadeProdutos}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FBFBE0",
    width: 125,
    height: 125,
    borderRadius: 10,
    padding: 10,
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  quantidadePill: {
    backgroundColor: "#373D32",
    borderRadius: 10,
    padding: 5,
  },
  quantidadeText: {
    fontSize: 16,
    color: "white",
    fontWeight: "bold",
  },
  quantidadeNumber: {
    fontSize: 32,
    fontWeight: "bold",
  },
});

export default QuantidadeProdutosCard;
