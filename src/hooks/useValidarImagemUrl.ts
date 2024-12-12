import { useState } from "react";

export const useValidarImagemUrl = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isValid, setIsValid] = useState(false);

  // Função para validar a URL da imagem
  const validarImagemUrl = async (url: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      // Verifica se a URL tem formato válido
      const urlPattern = new RegExp(
        "^(https?:\\/\\/)?" + // Protocolo
          "((([a-zA-Z0-9\\-]+)\\.)+([a-zA-Z]{2,}))" + // Domínio
          "(\\:\\d+)?(\\/[-a-zA-Z0-9@:%_\\+.~#?&//=]*)?$"
      );

      if (!urlPattern.test(url)) {
        setIsValid(false);
        return false;
      }

      // Verifica se a URL aponta para um recurso de imagem
      const response = await fetch(url, { method: "HEAD" }); // Envia apenas o cabeçalho
      const contentType = response.headers.get("Content-Type");

      const valid = contentType?.startsWith("image/") ?? false;
      setIsValid(valid);
      return valid;
    } catch (error) {
      console.error("Erro ao validar a imagem:", error);
      setIsValid(false);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return { validarImagemUrl, isLoading, isValid };
};
