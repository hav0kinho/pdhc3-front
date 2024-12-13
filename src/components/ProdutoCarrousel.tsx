import { FlatList, View } from "react-native";
import Produto from "../models/Produto";
import ProdutoCard from "./ProdutoCard";

interface Props {
  listaProdutos: Produto[];
}

// Componente que mostra os produtos em um "carrossel"
const ProdutoCarousel = ({ listaProdutos }: Props) => {
  return (
    <FlatList
      data={listaProdutos}
      renderItem={({ item }) => (
        <View>
          <ProdutoCard
            id={item.id}
            nome={item.nome}
            precoUnidade={item.precoUnidade}
            quantidade={item.quantidade}
            imagemUrl={item.imagemUrl}
          />
        </View>
      )}
      keyExtractor={(item) => item.id}
      horizontal
      showsHorizontalScrollIndicator={false}
      snapToAlignment="center"
      decelerationRate="fast"
      contentContainerStyle={{
        paddingHorizontal: 0, // Centraliza o primeiro e o último item
      }}
    />
  );
};

export default ProdutoCarousel;
