import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

const LoadingOverlay = () => (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex flex-col items-center justify-center z-50">
        <div className="relative">
            <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
            <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-8 h-8 bg-blue-500/20 rounded-full animate-ping"></div>
            </div>
        </div>
        <p className="mt-6 text-white font-semibold text-lg animate-pulse">
            Analisando imagem...
        </p>
        <p className="text-blue-200 text-sm font-light">Processando visão computacional</p>
    </div>
);

function Upload() {
    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (!file) {
            setPreview(null);
            return;
        }
        const objectUrl = URL.createObjectURL(file);
        setPreview(objectUrl);

        return () => URL.revokeObjectURL(objectUrl);
    }, [file]);

    async function sendImage() {
        if (!file) {
            alert("Por favor, selecione uma imagem primeiro.");
            return;
        }

        setLoading(true);
        const formData = new FormData();
        formData.append("file", file);

        try {
            const response = await fetch("http://127.0.0.1:8000/detectar", {
                method: "POST",
                body: formData,
            });

            if (!response.ok) throw new Error("Falha na comunicação com o servidor.");

            const imageBlob = await response.blob();
            const resultImageURL = URL.createObjectURL(imageBlob);
            
            const status = response.headers.get("X-Detection-Status") || "Análise Concluída";

            navigate("/result", { 
                state: { 
                    image: resultImageURL, 
                    status: status 
                } 
            });
        } catch (error) {
            alert("Erro ao processar: " + error.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="relative min-h-screen bg-slate-50 font-sans">
            {loading && <LoadingOverlay />}

            <div className="flex items-center justify-center min-h-screen p-4">
                <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 border border-slate-100">
                    <header className="text-center mb-8">
                        <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
                            Upload de Imagem
                        </h2>
                        <p className="text-slate-500 mt-2">Detecção de pessoas em áreas restritas</p>
                    </header>
                    
                    <div className="flex flex-col space-y-6">
                        {/* Container do Preview */}
                        <div className="w-full h-64 bg-slate-100 rounded-xl border-2 border-dashed border-slate-300 flex items-center justify-center overflow-hidden transition-all hover:border-blue-400 group">
                            {preview ? (
                                <img 
                                    src={preview} 
                                    alt="Preview" 
                                    className="w-full h-full object-contain"
                                />
                            ) : (
                                <div className="text-center p-6">
                                    <svg className="mx-auto h-12 w-12 text-slate-400 group-hover:text-blue-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                    <p className="mt-2 text-sm text-slate-500">Selecione uma foto para análise</p>
                                </div>
                            )}
                        </div>

                        {/* Input Customizado */}
                        <label className="block">
                            <span className="sr-only">Escolher arquivo</span>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => setFile(e.target.files[0])}
                                className="block w-full text-sm text-slate-500
                                          file:mr-4 file:py-2.5 file:px-4
                                          file:rounded-full file:border-0
                                          file:text-sm file:font-semibold
                                          file:bg-blue-50 file:text-blue-700
                                          hover:file:bg-blue-100
                                          cursor-pointer"
                            />
                        </label>
                        
                        <button
                            onClick={sendImage}
                            disabled={!file || loading}
                            className={`w-full font-bold py-4 px-6 rounded-xl shadow-lg transition-all duration-300 transform
                                ${file && !loading 
                                    ? "bg-blue-600 hover:bg-blue-700 text-white hover:-translate-y-1 active:scale-95 shadow-blue-200" 
                                    : "bg-slate-200 text-slate-400 cursor-not-allowed"}`}
                        >
                            {loading ? "Processando..." : "Analisar Imagem"}
                        </button>
                    </div>

                    <footer className="mt-8 text-center">
                        <button 
                            onClick={() => navigate("/")}
                            className="text-sm text-slate-400 hover:text-slate-600 transition-colors"
                        >
                            ← Voltar ao Início
                        </button>
                    </footer>
                </div>
            </div>
        </div>
    );
}

export default Upload;