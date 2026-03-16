import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

function Upload() {
    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const navigate = useNavigate();

    // Cria a URL de preview sempre que o arquivo mudar
    useEffect(() => {
        if (!file) {
            setPreview(null);
            return;
        }

        const objectUrl = URL.createObjectURL(file);
        setPreview(objectUrl);

        // Limpeza de memória ao desmontar o componente
        return () => URL.revokeObjectURL(objectUrl);
    }, [file]);

    const [loading, setLoading] = useState(false);

    async function sendImage() {
        if (!file) return;
        
        setLoading(true);
        try {
            const result = await analyzeImage(file);
            navigate("/result", { state: { result, preview: preview } });
        } catch (error) {
            alert("Erro na análise: " + error.message);
        } finally {
            setLoading(false);
        }
}

    return (
        <div className="flex items-center justify-center min-h-screen bg-slate-50 p-4">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 border border-slate-100">
                <h2 className="text-2xl font-bold text-slate-800 mb-6 text-center">
                    Análise de Área Restrita
                </h2>
                
                <div className="flex flex-col items-center space-y-6">
                    {/* Área de Preview */}
                    <div className="w-full h-64 bg-slate-100 rounded-xl border-2 border-dashed border-slate-300 flex items-center justify-center overflow-hidden">
                        {preview ? (
                            <img 
                                src={preview} 
                                alt="Preview" 
                                className="w-full h-full object-contain"
                            />
                        ) : (
                            <div className="text-center p-4">
                                <svg className="mx-auto h-12 w-12 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                <p className="mt-2 text-sm text-slate-500">Nenhuma imagem selecionada</p>
                            </div>
                        )}
                    </div>

                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setFile(e.target.files[0])}
                        className="block w-full text-sm text-slate-500
                                  file:mr-4 file:py-2 file:px-4
                                  file:rounded-full file:border-0
                                  file:text-sm file:font-semibold
                                  file:bg-blue-50 file:text-blue-700
                                  hover:file:bg-blue-100
                                  cursor:pointer"
                    />
                    
                    <button
                        onClick={sendImage}
                        disabled={!file}
                        className={`w-full font-semibold py-3 px-6 rounded-xl shadow-md transition-all duration-200 
                            ${file 
                                ? "bg-blue-600 hover:bg-blue-700 text-white transform hover:-translate-y-0.5" 
                                : "bg-slate-300 text-slate-500 cursor-not-allowed"}`}
                    >
                        Analisar imagem
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Upload;