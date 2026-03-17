export const analyzeImage = async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch(`${API_URL}/detectar`, {
        method: "POST",
        body: formData,
    });

    if (!response.ok) {
        throw new Error("Erro ao processar a imagem no servidor");
    }

    const data = await response.json();

    return {
        image: data.image,
        status: data.status
    };
};