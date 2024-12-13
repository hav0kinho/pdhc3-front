import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { UseDispatch, useSelector } from "react-redux";
import Venda from "../models/Venda";
import { RootState } from "../redux/store";

interface VendaCardProps {
  venda: Venda;
}
const formatDateTime = (date: Date) => {
  const day = String(date.getDate()).padStart(2, "0"); // Obtém o dia com 2 dígitos
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Mês (0-11) ajustado para (1-12)
  const year = date.getFullYear(); // Ano completo
  const hours = String(date.getHours()).padStart(2, "0"); // Horas com 2 dígitos
  const minutes = String(date.getMinutes()).padStart(2, "0"); // Minutos com 2 dígitos

  return `${day}/${month}/${year} ${hours}:${minutes}`;
};

// Componente de cartão de venda (Que tem o valor total e a data da venda e o botão para abrir o relatório)
const VendaCard = ({ venda }: VendaCardProps) => {
  const produtos = useSelector((state: RootState) => state.produtos.lista);
  // Função para exibir o relatório da venda
  const abrirRelatório = async () => {
    // Pegando os produtos vendidos da venda (Uma lista de strings com todos os produtos)
    const produtosVendidos = venda.produtosVendidos.map((produtoVenda) => {
      const produto = produtos.find(
        (produto) => produto.id === produtoVenda.produtoId
      );
      return `• ${produtoVenda.quantidadeVendida}x ${
        produto?.nome || "Produto desconhecido"
      }\n   - Total: R$ ${produtoVenda.valorPago.toFixed(2)}`;
    });

    // Junta todas as strings em uma única string
    const relatorioProdutosVendidos = produtosVendidos.join("\n\n");

    // Monta a string que vai representar o relatório da venda
    const relatorio = `📝 *Relatório da Venda*\n\n📅 Data: ${formatDateTime(
      new Date(venda.dataVenda)
    )}\n💰 Valor Total: R$ ${venda.valorTotal.toFixed(
      2
    )}\n\n📦 Produtos Vendidos:\n${relatorioProdutosVendidos}`;

    // Cria o alert com o relatório
    alert(relatorio);
  };
  return (
    <View style={styles.card}>
      {/* Informações */}
      <View style={styles.infoContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.valor}>R$ {venda.valorTotal.toFixed(2)}</Text>
        </View>
        <Text style={styles.dataVenda}>
          {formatDateTime(new Date(venda.dataVenda))}
        </Text>

        <View style={styles.botaoContainer}>
          <TouchableOpacity
            style={styles.botaoAdicionar}
            onPress={() => abrirRelatório()}
          >
            <Text style={styles.textoBotaoAdicionar}>Relatório</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#f8f9fa", // Fundo claro
    borderRadius: 10,
    overflow: "hidden",
    margin: 10,
    width: 120, // Largura do cartão
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  infoContainer: {
    backgroundColor: "#39362b",
    padding: 10,
    alignItems: "center",
  },
  textContainer: {
    alignItems: "center",
    height: 40,
  },
  valor: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#F5E2B9",
  },
  dataVenda: {
    fontSize: 14,
    color: "#F5E2B9",
    fontWeight: "bold",
  },
  botaoContainer: {
    marginTop: 15,
    width: "100%",
  },
  botaoAdicionar: {
    color: "black",
    borderRadius: 10,
    height: 30,
    backgroundColor: "#F9F1D2",
    justifyContent: "center", // Centraliza verticalmente
    alignItems: "center", // Centraliza horizontalmente
  },
  textoBotaoAdicionar: {
    fontWeight: "bold",
  },
});

export default VendaCard;
