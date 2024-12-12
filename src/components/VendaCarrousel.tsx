import { FlatList, View } from "react-native";
import Venda from "../models/Venda";
import VendaCard from "./VendaCard";

interface Props {
  listaVendas: Venda[];
}

const VendasCarrousel = ({ listaVendas }: Props) => {
  return (
    <FlatList
      data={listaVendas}
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
