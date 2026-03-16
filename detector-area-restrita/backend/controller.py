from fastapi import UploadFile, File
from fastapi.responses import FileResponse
import shutil
import os

TEMP_DIR = "temp_mock"
if not os.path.exists(TEMP_DIR):
    os.makedirs(TEMP_DIR)


async def detectar(file: UploadFile = File(...)):
    """
    Controller que processa a detecção de área restrita.
    
    Args:
        file: Arquivo de imagem enviado pelo cliente
        
    Returns:
        FileResponse: A imagem processada com header de status de detecção
    """
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
