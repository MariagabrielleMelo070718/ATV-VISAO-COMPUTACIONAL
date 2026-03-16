const API_URL = "http://127.0.0.1:8000";

export const analyzeImage = async (file) => {
    const formData = new FormData();
    formData.append("file", file); // O nome "file" aqui deve ser igual ao do FastAPI

    const response = await fetch(`${API_URL}/detectar`, { // Ajustado para /detectar
        method: "POST",
        body: formData,
    });

    if (!response.ok) {
        throw new Error("Erro ao processar a imagem no servidor");
    }

    const imageBlob = await response.blob();
    
    const status = response.headers.get("X-Detection-Status") || "Análise Concluída";

    return {
        imageObjectURL: URL.createObjectURL(imageBlob),
        status: status
    };
};