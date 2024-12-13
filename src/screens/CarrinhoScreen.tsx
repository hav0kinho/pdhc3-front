import React, { useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store";
import {
  limparCarrinho,
  removerDoCarrinho,
} from "../redux/slices/carrinhoSlice";
import {
  atualizarProdutos,
  incrementarEstoque,
  incrementarEstoquesDosProdutos,
} from "../redux/slices/produtosSlice";
import { createVenda, getVendas } from "../services/vendaService";
import { VendaCreateDTO } from "../models/DTO/VendaCreateDTO";

import Toast from "react-native-toast-message";
import { getProdutos } from "../services/produtoService";
import { atualizarVendas } from "../redux/slices/vendasSlice";
import {
  getCurrentPositionAsync,
  LocationObject,
  requestForegroundPermissionsAsync,
} from "expo-location";

const CarrinhoScreen = () => {
  const [location, setLocation] = React.useState<LocationObject | null>(null);
  const [granted, setGranted] = React.useState<boolean>(false);
  const carrinhoItens = useSelector((state: RootState) => state.carrinho.itens);
  const valorTotalCarrinho = carrinhoItens.reduce(
    (acc, item) => acc + item.precoUnidade * item.quantidadeCarrinho,
    0
  );

  const dispatch = useDispatch();

  const requestLocationPermission = async () => {
    const { granted } = await requestForegroundPermissionsAsync();
    if (granted) {
      setGranted(true);
    }
  };

  const handleLimparCarrinho = () => {
    dispatch(limparCarrinho());
    dispatch(incrementarEstoquesDosProdutos(carrinhoItens));
    alert("Carrinho limpo!");
  };

  const handleFinalizarCompra = async () => {
    let currentPosition: LocationObject | null = null;

    if (carrinhoItens.length === 0) {
      Toast.show({
        type: "error",
        text1: "Adicione produtos ao carrinho!",
        text2: `Deve ter pelo menos um produto no carrinho.`,
        visibilityTime: 4000, // Duração em milissegundos (2 segundos)
      });
      return;
    }

    console.log("Verificando se permissão foi garantida");
    if (granted) {
      console.log("pegando posição do usuário");
      currentPosition = await getCurrentPositionAsync();
      console.log("Posição do usuário: ", currentPosition);
      setLocation(currentPosition);
    } else {
      Toast.show({
        type: "error",
        text1: "Erro de Permissão",
        text2: `Habilite a localização para finalizar a compra.`,
        visibilityTime: 2000, // Duração em milissegundos (2 segundos
      });
      return;
    }

    console.log("Verificando se tem localização");
    console.log(location);
    console.log(currentPosition);
    if (!location && !currentPosition) {
      console.log("Retornaod pois não tem localização");
      return;
    }

    console.log("Resgatando Posição");
    const posicao = await getCurrentPositionAsync();

    console.log(
      "Posição: ",
      posicao.coords.latitude + " , " + posicao.coords.longitude
    );
    const novaVenda: VendaCreateDTO = {
      dataVenda: new Date().toISOString(),
      latitude: posicao.coords.latitude,
      longitude: posicao.coords.longitude,
      valorTotal: valorTotalCarrinho,
      produtosVendidos: carrinhoItens.map((item) => ({
        quantidadeVendida: item.quantidadeCarrinho,
        valorPago: item.precoUnidade * item.quantidadeCarrinho,
        produto: item.id,
      })),
    };
    console.log("Acessando Back para Criar venda");
    const venda = await createVenda(novaVenda);

    if (venda) {
      dispatch(limparCarrinho());

      try {
        const produtosAtualizados = await getProdutos();
        const vendasAtualizadas = await getVendas();

        dispatch(atualizarProdutos(produtosAtualizados));
        dispatch(atualizarVendas(vendasAtualizadas));

        Toast.show({
          type: "success",
          text1: "Compra Finalizada!",
          text2: `Sua compra foi realizada com sucesso.`,
          visibilityTime: 2000, // Duração em milissegundos (2 segundos)
        });
      } catch (error) {
        console.error("Erro ao atualizar o estado global: ", error);
        Toast.show({
          type: "error",
          text1: "Erro ao Atualizar Dados!",
          text2: `Houve um erro ao atualizar os dados.`,
          visibilityTime: 2000, // Duração em milissegundos (2 segundos)
        });
      }
    } else {
      Toast.show({
        type: "error",
        text1: "Erro ao Finalizar Compra!",
        text2: `Houve um erro ao finalizar a compra.`,
        visibilityTime: 2000, // Duração em milissegundos (2 segundos)
      });
    }
  };

  useEffect(() => {
    console.log("Pedidno Permissão");
    requestLocationPermission();
    console.log("Permissão: " + granted);
  }, []);

  const handleRemoverProduto = (id: string) => {
    dispatch(removerDoCarrinho(id));
    dispatch(incrementarEstoque({ id }));
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Seu Carrinho</Text>
        <Text style={styles.valorTotal}>
          R$ {valorTotalCarrinho.toFixed(2)}
        </Text>
      </View>
      <FlatList
        data={carrinhoItens}
        keyExtractor={(item, index) => `${item.id}-${index}`}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.nome}>{item.nome}</Text>
            <Text style={styles.preco}>R$ {item.precoUnidade}</Text>
            <Text style={styles.quantidade}>
              Unidades: {item.quantidadeCarrinho}
            </Text>
            <TouchableOpacity
              style={styles.botaoRemover}
              onPress={() => handleRemoverProduto(item.id)}
            >
              <Text style={styles.textoBotao}>Remover</Text>
            </TouchableOpacity>
          </View>
        )}
      />
      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={styles.botaoLimpar}
          onPress={handleLimparCarrinho}
        >
          <Text style={styles.textoBotao}>Limpar Carrinho</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.botaoFinalizar}
          onPress={handleFinalizarCompra}
        >
          <Text style={styles.textoBotao}>Finalizar Compra</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f0f8f4",
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  valorTotal: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#4b7258", // Cor verde para destacar o valor
  },
  card: {
    backgroundColor: "#39362b",
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  nome: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
  preco: {
    fontSize: 14,
    color: "#F5E2B9",
  },
  quantidade: {
    fontSize: 12,
    color: "#F5E2B9",
  },
  botaoRemover: {
    backgroundColor: "#FF6347",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 10,
  },
  botaoLimpar: {
    backgroundColor: "#FF6347",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 20,
  },
  botaoFinalizar: {
    backgroundColor: "#4b7258",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 20,
  },
  textoBotao: {
    color: "#fff",
    fontWeight: "bold",
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default CarrinhoScreen;
