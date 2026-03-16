const API_URL = "http://127.0.0.1:8000"; // URL padrão do FastAPI

export const analyzeImage = async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch(`${API_URL}/analyze`, {
        method: "POST",
        body: formData,
    });

    if (!response.ok) {
        throw new Error("Erro ao processar a imagem");
    }

    return response.json();
};