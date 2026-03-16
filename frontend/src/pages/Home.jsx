import { useNavigate } from "react-router-dom";
import '../App.css'; 

function Home() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50 p-6">
      <div className="max-w-2xl text-center space-y-6">
        <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">
          Monitoramento de Área Restrita
        </h1>
        <p className="text-lg text-slate-600 leading-relaxed">
          Sistema de visão computacional para detectar presença<br className="hidden md:block" />
          de pessoas em áreas restritas em tempo real.
        </p>
        <button
          onClick={() => navigate("/upload")}
          className="inline-flex items-center justify-center px-8 py-3 text-base font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-lg transition-all duration-200 transform hover:-translate-y-1"
        >
          Iniciar Análise
        </button>
      </div>
    </div>
  );
}

export default Home;