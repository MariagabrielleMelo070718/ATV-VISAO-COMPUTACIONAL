from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def home():
    return {"message": "API de Detecção em Área Restrita rodando!"}

@app.post("/detectar")
async def detectar(file: UploadFile = File(...)):
    return {
        "status": "sucesso",
        "pessoa_detectada": True, 
        "alerta": "Área Restrita Violada"
    }