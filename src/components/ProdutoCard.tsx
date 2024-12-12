import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import Produto from "../models/Produto";
import { useDispatch } from "react-redux";
import { adicionarAoCarrinho } from "../redux/slices/carrinhoSlice";
import Toast from "react-native-toast-message";
import { decrementarEstoque } from "../redux/slices/produtosSlice";

const ProdutoCard = ({
  id,
  nome,
  precoUnidade,
  quantidade,
  imagemUrl,
}: Produto) => {
  const dispatch = useDispatch();

  const handleAdicionarAoCarrinho = () => {
    const produto = { id, nome, precoUnidade, quantidade, imagemUrl };
    if (produto.quantidade > 0) {
      dispatch(adicionarAoCarrinho(produto));
      dispatch(decrementarEstoque({ id }));
      // Exibir mensagem de Toast
      Toast.show({
        type: "success",
        text1: "Produto Adicionado!",
        text2: `${nome} foi adicionado ao carrinho.`,
        visibilityTime: 2000, // Duração em milissegundos (2 segundos)
      });
    } else {
      // Exibir mensagem de Toast
      Toast.show({
        type: "error",
        text1: "Estoque Esgotado!",
        text2: `${nome} está fora de estoque.`,
        visibilityTime: 2000, // Duração em milissegundos (2 segundos)
      });
    }
  };
  return (
    <View style={styles.card}>
      {/* Imagem */}
      <Image source={{ uri: imagemUrl }} style={styles.image} />

      {/* Informações */}
      <View style={styles.infoContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.nome}>{nome}</Text>
        </View>
        <Text style={styles.preco}>R$ {Number(precoUnidade).toFixed(2)}</Text>
        <Text style={styles.quantidade}>
          Estoque: {quantidade > 0 ? quantidade : "Esgotado"}
        </Text>

        <View style={styles.botaoContainer}>
          <TouchableOpacity
            style={
              quantidade > 0 ? styles.botaoAdicionar : styles.botaoDesabilitado
            }
            onPress={handleAdicionarAoCarrinho}
            disabled={quantidade <= 0}
          >
            <Text style={styles.textoBotaoAdicionar}>Adicionar</Text>
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
  image: {
    width: "100%",
    height: 100, // Altura da imagem
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  infoContainer: {
    backgroundColor: "#39362b",
    padding: 10,
    alignItems: "center",
  },
  textContainer: {
    alignItems: "center",
    height: 80,
  },
  nome: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#F5E2B9",
  },
  quantidade: {
    fontSize: 11,
    color: "#F5E2B9",
  },
  preco: {
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
  botaoDesabilitado: {
    color: "black",
    borderRadius: 10,
    height: 30,
    backgroundColor: "#C0C0C0",
    justifyContent: "center", // Centraliza verticalmente
    alignItems: "center", // Centraliza horizontalmente
  },
  textoBotaoAdicionar: {
    fontWeight: "bold",
  },
});

export default ProdutoCard;
