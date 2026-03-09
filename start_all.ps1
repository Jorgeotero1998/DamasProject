# Iniciar Backend usando ruta absoluta
start powershell { 
    cd "C:\Users\Andre\Damas_Project\api_damas"
    python -m uvicorn main:app --reload --port 8000
    Write-Host '--- El proceso del Backend se detuvo ---'
    Read-Host
}

# Iniciar Frontend usando ruta absoluta
start powershell { 
    cd "C:\Users\Andre\Damas_Project\web_damas"
    npm run dev 
    Write-Host '--- El proceso del Frontend se detuvo ---'
    Read-Host
}
