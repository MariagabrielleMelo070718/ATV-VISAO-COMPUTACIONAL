import { useLocation } from "react-router-dom";
import '../App.css'; 

function Result() {
    const location = useLocation();
    const data = location.state;

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50 p-6 text-center">
            <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
                <div className="mb-4 inline-flex items-center justify-center w-12 h-12 bg-green-100 text-green-600 rounded-full">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                </div>
                <h2 className="text-2xl font-bold text-slate-900 mb-2">Resultado da análise</h2>
                <p className="text-slate-600 mb-6">Imagem enviada com sucesso para o motor de IA.</p>
                
                <div className="bg-slate-50 rounded-lg p-4 border border-dashed border-slate-300">
                    <p className="text-sm text-slate-500 italic">
                        Aqui aparecerá o resultado da detecção de pessoas.
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Result;