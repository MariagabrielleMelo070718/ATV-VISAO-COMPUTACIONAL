# 🛡️ Sistema de Monitoramento de Áreas Restritas (SMAR)

Aplicação de Visão Computacional para detecção automática de invasões em perímetros de segurança, desenvolvida como parte da avaliação de **Visão Computacional - AV01**.

---

## 👥 Grupo (Projeto Integrador V)
* **Elynne Lima** - Responsável por Docker/Deploy
* **Elcio José da Silva** - Responsável por Frontend/UX
* **Thiago Henrique de Melo** - Responsável por Backend/IA
* **Maria Gabrielle de Melo** - Responsável por Frontend/UX

---

## 📖 Caso de Uso: Segurança Industrial
Em ambientes industriais, como subestações elétricas ou salas de servidores, a presença humana em horários não autorizados ou áreas de risco representa um perigo crítico. 

Este projeto automatiza a vigilância:
1.  **Monitoramento:** O operador faz o upload de uma imagem (simulando um frame de câmera).
2.  **Inferência:** O modelo **DETR (DEtection TRansformer)** do Hugging Face analisa a imagem em busca de pessoas.
3.  **Resposta:** Se uma pessoa é detectada com confiança acima de 70%, o sistema gera um alerta visual, desenha um bounding box vermelho e altera o status da área para "INVASÃO DETECTADA".

---

## 🛠️ Tecnologias Utilizadas

### Backend
* **FastAPI:** Framework moderno e rápido para construção da API.
* **Hugging Face (Transformers):** Modelo de Deep Learning pré-treinado para detecção de objetos de última geração.
* **Pillow (PIL):** Processamento e manipulação de imagens em memória.

### Frontend
* **React + Vite:** Interface ágil e reativa para o usuário.
* **Tailwind CSS:** Estilização moderna e responsiva.

---

## 🚀 Como Executar o Projeto

### 🐳 Via Docker (Recomendado para o Ponto Extra)
Certifique-se de ter o Docker e o Docker Compose instalados. Na raiz do projeto, execute:

```bash
docker-compose up --build
```
Aguarde o download do modelo (aproximadamente 150MB na primeira execução). 
* **Frontend:** `http://localhost:5173`
* **Backend:** `http://localhost:8000`

---

### 🐍 Execução Local (Sem Docker)

#### 1. Backend
1. Entre na pasta `detector-area-restrita`.
2. Crie um ambiente virtual: `python -m venv venv`.
3. Ative o venv: `source venv/bin/activate` (Linux/Mac) ou `.\venv\Scripts\activate` (Windows).
4. Instale as dependências: `pip install -r requirements.txt`.
5. Inicie o servidor: `uvicorn main:app --reload`.

#### 2. Frontend
1. Entre na pasta `frontend`.
2. Instale as dependências: `npm install`.
3. Inicie o Vite: `npm run dev`.

---

## 📁 Estrutura de Pastas
* `/detector-area-restrita`: Servidor FastAPI e lógica de inferência.
* `/frontend`: Aplicação React com interface de upload e resultados.
* `docker-compose.yml`: Orquestração dos serviços.
```