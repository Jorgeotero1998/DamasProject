
# 🏁 Damas Project - 

Un motor de juego de damas profesional con una arquitectura moderna de microservicios, diseñado para ofrecer una experiencia visual de alta fidelidad y sugerencias inteligentes.

Screenshot <img width="1907" height="902" alt="Captura de pantalla 2026-03-09 154743" src="https://github.com/user-attachments/assets/954308a7-ddd2-41b0-8db4-47d017d482fe" />


## 🚀 Tecnologías Utilizadas

### Backend (Core Logic)
* **Python 3.13** + **FastAPI**: Gestión de estado y motor de movimientos.
* **Uvicorn**: Servidor ASGI de alto rendimiento.
* **Algoritmo de Sugerencias**: Lógica para análisis de movimientos legales y recomendaciones en tiempo real.

### Frontend (User Interface)
* **React** + **Vite**: Interfaz reactiva y ultrarrápida.

## 🛠️ Instalación y Ejecución

1.  **Requisitos previos**: Tener instalado Python y Node.js.
2.  **Lanzamiento automático**: He creado un script de PowerShell para arrancar ambos servidores simultáneamente:
    \`\`\`powershell
    .\start_all.ps1
    \`\`\`
3.  **Acceso**: Abre tu navegador en \`http://localhost:5173\`.

## 🧠 Características Destacadas
* **Diseño Realista**
* **Sugerencia de Movimientos**
* **Contador en Vivo**: Seguimiento preciso de piezas capturadas para ambos bandos.
* **Clean Code**: Código estructurado sin comentarios innecesarios, siguiendo las mejores prácticas de desarrollo.
"@ | Out-File -FilePath README.md -Encoding utf8
