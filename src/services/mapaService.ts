import { apiFetch } from "./api";

// Função para buscar o endereço de acordo com a latitude e longitude (Não usada por conta de alguns problemas relacionados ao CORS da API)
export const getEndereco = async (
  latitude: string | number,
  logitude: string | number
) => {
  const response = await apiFetch(
    `https://nominatim.openstreetmap.org/reverse?lat=${latitude.toString()}&lon=${logitude.toString()}&format=json`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "User-Agent": "FeiraItineranteApp/1.0", // Substitua com informações relevantes
      },
    }
  );
  const data = await response.json();

  console.error(response);

  const endereco = {
    rua: data.address.road,
    bairro: data.address.hamlet,
    cidade: data.address.city,
    estado: data.address.state,
    cep: data.address.postcode,
    pais: data.address.country,
  };

  return endereco;
};
