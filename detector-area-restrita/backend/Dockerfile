FROM python:3.11-slim

# Instala bibliotecas de sistema essenciais para OpenCV
RUN apt-get update && apt-get install -y \
    libgl1 \
    libglib2.0-0 \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copia e instala as dependências do Python
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copia o restante do código
COPY . .

EXPOSE 8000

# Comando para rodar o FastAPI
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]