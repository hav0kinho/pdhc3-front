import React from "react";
import { View, Dimensions, StyleSheet, Text, FlatList } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import Ionicons from "react-native-vector-icons/Ionicons";
import CadastroProdutoScreen from "../screens/CadastroProdutoScreen";
import CarrinhoScreen from "../screens/CarrinhoScreen";
import MapasScreen from "../screens/MapaScreen";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import DetalhesVendaScreen from "../screens/DetalhesVendaScreen";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function TabNavigator() {
  const carrinhoItens = useSelector((state: RootState) => state.carrinho.itens);
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        animationEnabled: true,
        animation: "shift",
        tabBarIcon: ({ color, size }) => {
          let iconName = "home";

          if (route.name === "Home") {
            iconName = "home";
          } else if (route.name === "Carrinho") {
            iconName = "cart";
          } else if (route.name === "CadastroProduto") {
            iconName = "create";
          } else if (route.name === "Mapa") {
            iconName = "map";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarBadge:
          route.name === "Carrinho"
            ? carrinhoItens.length > 0
              ? carrinhoItens.length
              : undefined
            : undefined,
        tabBarActiveTintColor: "#ffffff",
        tabBarInactiveTintColor: "#c1c1c1",
        tabBarStyle: { backgroundColor: "#627053" }, // Estilo do menu inferior
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: "Home", // Título exibido no cabeçalho
          headerStyle: {
            backgroundColor: "#627053", // Cor de fundo do cabeçalho
          },
          headerTitleAlign: "center",
          headerTintColor: "#ffffff", // Cor do texto e ícones no cabeçalho
          headerTitleStyle: {
            fontWeight: "bold", // Estilo do título
            fontSize: 24, // Tamanho do título
            textAlign: "center", // Centraliza o texto no cabeçalho (se aplicável)
          },
        }}
      />
      <Tab.Screen
        name="CadastroProduto"
        component={CadastroProdutoScreen}
        options={{
          title: "Cadastrar Produto",
          headerStyle: {
            backgroundColor: "#627053", // Cor de fundo do cabeçalho
          },
          headerTitleAlign: "center",
          headerTintColor: "#ffffff", // Cor do texto e ícones no cabeçalho
          headerTitleStyle: {
            fontWeight: "bold", // Estilo do título
            fontSize: 24, // Tamanho do título
            textAlign: "center", // Centraliza o texto no cabeçalho (se aplicável)
          },
        }}
      />
      <Tab.Screen
        name="Mapa"
        component={MapasScreen}
        options={{
          title: "Mapa",
          headerStyle: {
            backgroundColor: "#627053", // Cor de fundo do cabeçalho
          },
          headerTitleAlign: "center",
          headerTintColor: "#ffffff", // Cor do texto e ícones no cabeçalho
          headerTitleStyle: {
            fontWeight: "bold", // Estilo do título
            fontSize: 24, // Tamanho do título
            textAlign: "center", // Centraliza o texto no cabeçalho (se aplicável)
          },
        }}
      />

      <Tab.Screen
        name="Carrinho"
        component={CarrinhoScreen}
        options={{
          title: "Carrinho",
          headerStyle: {
            backgroundColor: "#627053", // Cor de fundo do cabeçalho
          },
          headerTitleAlign: "center",
          headerTintColor: "#ffffff", // Cor do texto e ícones no cabeçalho
          headerTitleStyle: {
            fontWeight: "bold", // Estilo do título
            fontSize: 24, // Tamanho do título
            textAlign: "center", // Centraliza o texto no cabeçalho (se aplicável)
          },
        }}
      />
    </Tab.Navigator>
  );
}
const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Tabs"
        screenOptions={{
          headerTintColor: "#fff",
          headerTitleStyle: { fontWeight: "bold", fontSize: 20 },
          headerTitleAlign: "center", // Centraliza o título
          headerStyle: { backgroundColor: "#627053" }, // Fundo do cabeçalho
        }}
      >
        <Stack.Screen
          name="Tabs"
          component={TabNavigator}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="DetalhesVenda"
          component={DetalhesVendaScreen}
          options={{ title: "Detalhes da Venda" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#5F785D",
  },
});

export default AppNavigator;
