import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
} from "react-native";
import { UseSelector, useDispatch } from "react-redux";
import { createProduto } from "../services/produtoService";
import { UseDispatch } from "react-redux";

import ProdutoCreateDTO from "../models/DTO/ProdutoCreateDTO";

import { useValidarImagemUrl } from "../hooks/useValidarImagemUrl";
import Produto from "../models/Produto";
import { adicionarProduto } from "../redux/slices/produtosSlice";
import Toast from "react-native-toast-message";

const CadastroProdutoScreen = () => {
  // Estado para os campos do formulário
  const [produto, setProduto] = useState<ProdutoCreateDTO>({
    nome: "",
    precoUnidade: 0,
    quantidade: 0,
    imagemUrl: "",
  });

  const dispatch = useDispatch();

  const { validarImagemUrl, isLoading } = useValidarImagemUrl(); // Use o hook para validar a URL da imagem

  // Validação e submissão do formulário (Obrigatoriedade de Campos, Formatação de Números e URL de Imagem)
  const handleCadastro = async () => {
    const { nome, precoUnidade, quantidade, imagemUrl } = produto;

    // Validação da obrigatoriedade dos campos
    if (!nome || !precoUnidade || !quantidade || !imagemUrl) {
      Toast.show({
        type: "error",
        text1: "Todos os campos são obrigatórios",
        visibilityTime: 3000,
      });
      return;
    }

    // Validação de números
    if (isNaN(Number(precoUnidade)) || isNaN(Number(quantidade))) {
      Toast.show({
        type: "error",
        text1: "Preço e Quantidade devem ser números",
        visibilityTime: 3000,
      });
      return;
    }

    // Validação da URL da imagem
    const urlValida = await validarImagemUrl(imagemUrl);
    if (!urlValida) {
      Toast.show({
        type: "error",
        text1: "A URL da imagem é inválida",
        visibilityTime: 3000,
      });
      return;
    }

    Alert.alert("Sucesso", "Produto cadastrado com sucesso!");

    // Cria um novo produto com os dados do formulário
    const novoProduto = {
      nome: nome,
      precoUnidade: Number(precoUnidade),
      quantidade: Number(quantidade),
      imagemUrl: imagemUrl,
    };
    const produtoCadastrado: Produto | null = await createProduto(novoProduto);
    if (produtoCadastrado) {
      dispatch(adicionarProduto(produtoCadastrado)); // Adiciona o produto ao Redux/Estado Global
    }

    setProduto({ nome: "", precoUnidade: 0, quantidade: 0, imagemUrl: "" });
  };

  // Função para formatar a entrada de números nos campos de preço e quantidade (usa REGEX para formatar os valores, não encontrei um componente para isso)
  const handleInputNumberChange = (
    field: keyof ProdutoCreateDTO,
    value: string
  ) => {
    setProduto((prev) => {
      let formattedValue = value;

      if (field === "precoUnidade") {
        // Substituir vírgula por ponto, permitir apenas um ponto decimal e limitar a duas casas decimais
        formattedValue = value
          .replace(",", ".") // Substituir vírgula por ponto
          .replace(/[^0-9.]/g, "") // Permitir apenas números e ponto
          .replace(/(\..*?)\.+/g, "$1") // Evitar múltiplos pontos
          .replace(/^0+(?=\d)/, "0"); // Evitar zeros à esquerda, exceto "0."

        // Limitar a duas casas decimais
        if (formattedValue.includes(".")) {
          const [integerPart, decimalPart] = formattedValue.split(".");
          formattedValue =
            decimalPart.length > 2
              ? `${integerPart}.${decimalPart.slice(0, 2)}`
              : formattedValue;
        }

        // Remover ponto inicial, se houver
        if (formattedValue.startsWith(".")) {
          formattedValue = "0" + formattedValue;
        }
      } else if (field === "quantidade") {
        // Permitir apenas números inteiros
        formattedValue = value.replace(/[^0-9]/g, "");
      }

      return { ...prev, [field]: formattedValue };
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Campo: Nome */}
      <Text style={styles.label}>Nome do Produto</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite o nome do produto"
        value={produto.nome}
        onChangeText={(text) => setProduto((prev) => ({ ...prev, nome: text }))}
      />

      {/* Campo: Preço por Unidade */}
      <Text style={styles.label}>Preço por Unidade/Kg (R$)</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite o preço (R$)"
        keyboardType="numeric"
        value={produto.precoUnidade.toString()}
        onChangeText={(text) => handleInputNumberChange("precoUnidade", text)}
      />

      {/* Campo: Quantidade */}
      <Text style={styles.label}>Quantidade</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite a quantidade"
        keyboardType="numeric"
        value={produto.quantidade.toString()}
        onChangeText={(text) => handleInputNumberChange("quantidade", text)}
      />

      {/* Campo: URL da Imagem */}
      <Text style={styles.label}>URL da Imagem</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite a URL da imagem"
        value={produto.imagemUrl}
        onChangeText={(text) =>
          setProduto((prev) => ({ ...prev, imagemUrl: text }))
        }
      />

      {/* Botão de Cadastro */}
      <TouchableOpacity style={styles.button} onPress={handleCadastro}>
        <Text style={styles.buttonText}>Cadastrar Produto</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "#f0f8f4",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#4b7258",
    textAlign: "center",
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: "#4b7258",
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#b5d3be",
    backgroundColor: "#ffffff",
    padding: 10,
    borderRadius: 5,
    marginBottom: 15,
    fontSize: 16,
    color: "#333",
  },
  button: {
    backgroundColor: "#4b7258",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#ffffff",
  },
});

export default CadastroProdutoScreen;
