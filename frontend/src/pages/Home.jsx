import { useNavigate } from "react-router-dom";

function Home() {
	const navigate = useNavigate();

	return (
		<div style={{ textAlign: "center", marginTop: "100px" }}>
			<h1>Monitoramento de Área Restrita</h1>
			<p>
				Sistema de visão computacional para detectar presença<br />
				de pessoas em áreas restritas.
			</p>
			<button
				onClick={() => navigate("/upload")}
				style={{
					padding: "10px 20px",
					fontSize: "18px",
					cursor: "pointer",
				}}
			>
				Iniciar Análise
			</button>
		</div>
	);
}

export default Home;