import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import MapView, { Marker, Callout } from "react-native-maps";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

const MapaScreen = ({ navigation }: { navigation: any }) => {
  const vendas = useSelector((state: RootState) => state.vendas.lista);

  const coordenadasVendas = vendas.map((venda) => ({
    latitude: venda.latitude,
    longitude: venda.longitude,
  })); // Array de objetos com latitude e longitude das vendas

  console.log(coordenadasVendas);

  //lista.at(-1)
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: vendas[0]?.latitude || -8.05428,
          longitude: vendas[0]?.longitude || -34.8813,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
      >
        {vendas.map((venda) => (
          <Marker
            key={venda.id}
            title={`Produtos Vendidos: ${venda.produtosVendidos.length.toString()}`}
            description={`Valor Total: R$ ${venda.valorTotal.toFixed(2)}`}
            coordinate={{
              latitude: venda.latitude,
              longitude: venda.longitude,
            }}
            onCalloutPress={() => {
              navigation.navigate("DetalhesVenda", { vendaId: venda.id });
            }}
          ></Marker>
        ))}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  callout: {
    width: 200, // Adjust width as needed
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 8,
    alignItems: "center",
  },
  calloutTitle: {
    fontSize: 16, // Tamanho da fonte maior para o título
    fontWeight: "bold", // Negrito para destaque
    marginBottom: 5, // Espaçamento abaixo do título
    color: "#000", // Cor do texto
  },
  calloutText: {
    fontSize: 14, // Texto menor para informações adicionais
    color: "#555", // Cor suave para texto secundário
  },
  customCallout: {
    position: "absolute",
    top: -30, // Ajuste a posição vertical conforme necessário
    backgroundColor: "white",
    padding: 10,
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

export default MapaScreen;
