from fastapi import UploadFile, File
from fastapi.responses import JSONResponse
from PIL import Image, ImageDraw
import io
import base64
from transformers import pipeline


# Carrega o modelo de detecção globalmente para não carregar a cada requisição
# O modelo 'detr-resnet-50' é o padrão ouro do Hugging Face para isso
detector = pipeline("object-detection", model="hustvl/yolos-tiny")

async def detectar(file: UploadFile = File(...)):
    # 1. Lê os bytes do arquivo enviado
    contents = await file.read()
    image = Image.open(io.BytesIO(contents)).convert("RGB")
    
    # 2. Executa a inferência
    results = detector(image)
    
    # 3. Filtra apenas detecções de pessoas com alta confiança (> 0.7)
    pessoas = [obj for obj in results if obj["label"] == "person" and obj["score"] > 0.7]
    detectou_invasao = len(pessoas) > 0

    # 4. Desenha as caixas na imagem para mostrar no Front-end
    draw = ImageDraw.Draw(image)
    for p in pessoas:
        box = p["box"]
        draw.rectangle(
            [(box["xmin"], box["ymin"]), (box["xmax"], box["ymax"])],
            outline="red", width=5
        )

    # 5. Transforma a imagem processada em Base64 para o seu Front-end (React/Vite)
    buffered = io.BytesIO()
    image.save(buffered, format="JPEG")
    img_str = base64.b64encode(buffered.getvalue()).decode()

    # Retorna JSON (mais fácil para o React lidar do que FileResponse direto)
    return JSONResponse(
        content={
            "status": "INVASÃO DETECTADA" if detectou_invasao else "ÁREA SEGURA",
            "alerta": detectou_invasao,
            "image": f"data:image/jpeg;base64,{img_str}",
            "count": len(pessoas)
        },
        headers={"X-Detection-Status": "Processado"}
    )