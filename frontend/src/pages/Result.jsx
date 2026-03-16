import { useLocation, useNavigate } from "react-router-dom";

function Result() {
    const location = useLocation();
    const navigate = useNavigate();
    const { image, status } = location.state || {};

    if (!image) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen">
                <p className="text-slate-600">Nenhum resultado para exibir.</p>
                <button onClick={() => navigate("/upload")} className="mt-4 bg-blue-600 text-white px-4 py-2 rounded">Voltar</button>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center min-h-screen bg-slate-50 p-6">
            <div className="max-w-2xl w-full bg-white p-8 rounded-2xl shadow-xl border border-slate-200 text-center">
                <h2 className="text-2xl font-bold text-slate-900 mb-6 italic">
                   {status}
                </h2>

                <div className="relative rounded-lg overflow-hidden border-4 border-slate-900 mb-8">
                    <img src={image} alt="Resultado do Mock" className="w-full h-auto" />
                </div>

                <button 
                    onClick={() => navigate("/upload")}
                    className="px-8 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all font-semibold"
                >
                    Nova Análise
                </button>
            </div>
        </div>
    );
}

export default Result;