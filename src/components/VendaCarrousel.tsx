import { FlatList, View } from "react-native";
import Venda from "../models/Venda";
import VendaCard from "./VendaCard";

interface Props {
  listaVendas: Venda[];
}

const VendasCarrousel = ({ listaVendas }: Props) => {
  // Função para ordenar as vendas por data (mais recente primeiro para o UX e etc)
  const ordenarVendasPorData = (vendas: Venda[]): Venda[] => {
    return vendas.sort((a, b) => {
      const dataA = new Date(a.dataVenda);
      const dataB = new Date(b.dataVenda);

      // Comparar as datas (mais recente primeiro)
      return dataB.getTime() - dataA.getTime();
    });
  };

  return (
    <FlatList
      data={ordenarVendasPorData(listaVendas)}
      renderItem={({ item }) => (
        <View>
          <VendaCard venda={item} />
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

export default VendasCarrousel;
