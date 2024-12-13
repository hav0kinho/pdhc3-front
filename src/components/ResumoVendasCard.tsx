import { StyleSheet, View, Text } from "react-native";

interface Props {
  quantidadeVendas: number;
  valorTotal: number;
}

// Componente que mostra a quantidade de vendas e o R$ total do dia
const ResumoVendasCard = ({ quantidadeVendas, valorTotal }: Props) => {
  console.log("valorTotal", valorTotal);
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.resumoDia}>
          Resumo do dia:{" "}
          <Text style={styles.dinheiroTotal}>R$ {valorTotal.toFixed(2)}</Text>
        </Text>
        <Text style={styles.quantidadeVendas}>
          {quantidadeVendas} vendas registradas
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FBFBE0",
    width: "100%",
    height: 100,
    borderRadius: 10,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  textContainer: {
    alignItems: "flex-start",
  },
  resumoDia: {
    fontSize: 24,
    fontWeight: "bold",
  },
  quantidadeVendas: {
    fontSize: 14,
  },
  dinheiroTotal: {
    color: "green",
  },
});

export default ResumoVendasCard;
