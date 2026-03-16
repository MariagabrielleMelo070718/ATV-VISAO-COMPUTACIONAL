import { useState } from "react"
import { useNavigate } from "react-router-dom"


function Upload() {
    const [file, setFile] = useState(null);
    const navigate = useNavigate();

    function sendImage() {
        if (!file) {
            alert("Selecione uma imagem");
            return;
        }
        navigate("/result", { state: { image: file } });
    }

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                minHeight: "80vh",
                background: "#f7f7f7",
                borderRadius: "16px",
                boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
                maxWidth: 400,
                margin: "80px auto",
                padding: 32,
            }}
        >
            <h2 style={{ marginBottom: 32, color: "#333" }}>Enviar imagem para análise</h2>
            <input
                type="file"
                onChange={(e) => setFile(e.target.files[0])}
                style={{
                    marginBottom: 24,
                    padding: "8px 0",
                    border: "1px solid #ccc",
                    borderRadius: 6,
                    background: "#fff",
                    width: "100%",
                }}
            />
            <button
                onClick={sendImage}
                style={{
                    padding: "12px 28px",
                    background: "#1976d2",
                    color: "#fff",
                    border: "none",
                    borderRadius: 6,
                    fontSize: 16,
                    fontWeight: 500,
                    cursor: "pointer",
                    transition: "background 0.2s",
                }}
                onMouseOver={e => (e.target.style.background = '#1565c0')}
                onMouseOut={e => (e.target.style.background = '#1976d2')}
            >
                Analisar imagem
            </button>
        </div>
    );
}

export default Upload