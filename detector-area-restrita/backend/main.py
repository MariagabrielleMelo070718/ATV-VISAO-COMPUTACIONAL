from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from controller import detectar

app = FastAPI()

# Configuração de CORS para o Vite
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/detectar")
async def detection_endpoint(file: UploadFile = File(...)):
    return await detectar(file)

@app.get("/")
def health_check():
    return {"status": "Mock API ativa"}