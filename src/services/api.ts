const baseUrl = "http://localhost:3000";
// const baseUrl = "http://10.0.3.2:3000";
export const apiRoutes = {
  produto: `${baseUrl}/api/produtos`,
  venda: `${baseUrl}/api/vendas`,
  produtosVenda: `${baseUrl}/api/vendas/produtos-venda`,
};

export const apiFetch = async (url: string, options?: RequestInit) => {
  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error(`Erro na requisição: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Erro ao acessar ${url}:`, error);
    throw error; // Rejeitar a promessa para lidar no chamador
  }
};
