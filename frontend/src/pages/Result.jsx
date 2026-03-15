import { useLocation } from "react-router-dom";

function Result() {
	const location = useLocation();
	const data = location.state;

	return (
		<div style={{ textAlign: "center", marginTop: "100px" }}>
			<h2>Resultado da análise</h2>
			<p>Imagem enviada com sucesso.</p>
			<p>Aqui aparecerá o resultado da detecção de pessoas.</p>
		</div>
	);
}

export default Result;