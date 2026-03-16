from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
import shutil
import os

app = FastAPI()

# Configuração de CORS para o Vite
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Pasta temporária para salvar a imagem do mock
TEMP_DIR = "temp_mock"
if not os.path.exists(TEMP_DIR):
    os.makedirs(TEMP_DIR)

@app.post("/detectar")
async def detectar(file: UploadFile = File(...)):
    # Caminho onde a imagem será salva temporariamente
    file_path = os.path.join(TEMP_DIR, file.filename)
    
    # Salva o arquivo enviado pelo front no disco do container
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
    
    # Retorna a mesma imagem que foi enviada
    # O front-end receberá o arquivo binário da imagem
    return FileResponse(
        path=file_path, 
        media_type=file.content_type,
        headers={"X-Detection-Status": "Pessoa Detectada - Area Restrita"}
    )

@app.get("/")
def health_check():
    return {"status": "Mock API ativa"}