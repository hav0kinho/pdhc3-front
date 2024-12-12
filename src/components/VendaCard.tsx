import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { UseDispatch, useSelector } from "react-redux";
import Venda from "../models/Venda";
import { RootState } from "../redux/store";

interface VendaCardProps {
  venda: Venda;
}

const VendaCard = ({ venda }: VendaCardProps) => {
  const produtos = useSelector((state: RootState) => state.produtos.lista);
  const abrirRelatório = async () => {
    // Pegando os produtos vendidos da venda
    const produtosVendidos = venda.produtosVendidos.map((produtoVenda) => {
      const produto = produtos.find(
        (produto) => produto.id === produtoVenda.produtoId
      );
      return `• ${produto?.nome || "Produto desconhecido"}\n   - Quantidade: ${
        produtoVenda.quantidadeVendida
      }\n   - Total: R$ ${produtoVenda.valorPago.toFixed(2)}`;
    });

    const relatorioProdutosVendidos = produtosVendidos.join("\n\n");

    const relatorio = `📝 *Relatório da Venda*\n\n📅 Data: ${new Date(
      venda.dataVenda
    ).toLocaleDateString(
      "pt-BR"
    )}\n💰 Valor Total: R$ ${venda.valorTotal.toFixed(
      2
    )}\n\n📦 Produtos Vendidos:\n${relatorioProdutosVendidos}`;

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
          {new Date(venda.dataVenda).toLocaleDateString("pt-BR")}
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
