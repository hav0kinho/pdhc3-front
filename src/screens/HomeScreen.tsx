import React, { useEffect, useState } from "react";
import { View, Text, Button, StyleSheet, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ProdutosAgricolasCard from "../components/ProdutosAgricolasCard";
import QuantidadeProdutosCard from "../components/QuantidadeProdutosCard";
import ProdutoCarousel from "../components/ProdutoCarrousel";
import ResumoVendasCard from "../components/ResumoVendasCard";
import Produto from "../models/Produto";
import { getProdutos } from "../services/produtoService";
import { getVendas } from "../services/vendaService";
import Venda from "../models/Venda";
import { useResumoDoDia } from "../hooks/useResumoDoDia";
import { useDispatch, useSelector } from "react-redux";
//REDUX
import { atualizarProdutos } from "../redux/slices/produtosSlice";
import { atualizarVendas } from "../redux/slices/vendasSlice";
import VendaCard from "../components/VendaCard";
import VendasCarrousel from "../components/VendaCarrousel";
import { RootState } from "../redux/store";

const HomeScreen = ({ navigation }: { navigation: any }) => {
  const produtos = useSelector((state: RootState) => state.produtos.lista);
  const vendas = useSelector((state: RootState) => state.vendas.lista);

  const { vendasDoDia, quantidadeVendas, valorTotal } = useResumoDoDia(); // Hook customizado para pegar dados das vendas do dia.
  const [isLoading, setIsLoading] = useState(true);

  const dispatch = useDispatch();

  // Função para buscar produtos da API através do produtoService
  const fetchProdutos = async () => {
    setIsLoading(true);
    try {
      const data = await getProdutos();
      // console.log(data);
      dispatch(atualizarProdutos(data));
    } catch (e) {
      console.error("Erro ao buscar produtos", e);
    } finally {
      setIsLoading(false);
    }
  };

  // Função para buscar vendas da API através do vendaService
  const fetchVendas = async () => {
    setIsLoading(true);
    try {
      const data = await getVendas();
      console.log(data);
      dispatch(atualizarVendas(data));
    } catch (e) {
      console.error("Erro ao buscar vendas", e);
    } finally {
      setIsLoading(false);
    }
  };

  // useEffect para buscar produtos e vendas ao carregar a tela
  useEffect(() => {
    fetchProdutos();
    fetchVendas();
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.produtoCardContainer}>
          <ProdutosAgricolasCard />
          <QuantidadeProdutosCard quantidadeProdutos={produtos.length} />
        </View>
        <View style={styles.produtosCarouselContainer}>
          {produtos.length > 0 ? (
            <ProdutoCarousel listaProdutos={produtos} />
          ) : (
            <Text style={styles.semProdutosCadastradosText}>
              Sem produtos cadastrados
            </Text>
          )}
        </View>
        <View style={styles.resumoVendasContainer}>
          <ResumoVendasCard
            quantidadeVendas={quantidadeVendas}
            valorTotal={valorTotal}
          />
        </View>
        <View>
          {vendasDoDia.length > 0 ? (
            <VendasCarrousel listaVendas={vendasDoDia} />
          ) : (
            <Text style={styles.semProdutosCadastradosText}>
              Sem vendas cadastradas
            </Text>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#627053",
  },
  produtoCardContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  produtosCarouselContainer: {
    marginTop: 10,
  },
  resumoVendasContainer: {
    marginTop: 10,
  },
  semProdutosCadastradosText: {
    padding: 10,
    fontSize: 18,
    color: "white",
    textAlign: "center",
  },
});

export default HomeScreen;
