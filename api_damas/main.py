from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import random

app = FastAPI()
app.add_middleware(CORSMiddleware, allow_origins=["*"], allow_methods=["*"], allow_headers=["*"])

def get_initial_board():
    return [
        [0, 2, 0, 2, 0, 2, 0, 2], [2, 0, 2, 0, 2, 0, 2, 0], [0, 2, 0, 2, 0, 2, 0, 2],
        [0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0],
        [1, 0, 1, 0, 1, 0, 1, 0], [0, 1, 0, 1, 0, 1, 0, 1], [1, 0, 1, 0, 1, 0, 1, 0]
    ]

board = get_initial_board()

def get_game_data(b):
    w = sum(row.count(1) for row in b)
    n = sum(row.count(2) for row in b)
    status = f"Quedan {w} Blancas vs {n} Negras" if (w <= 4 or n <= 4) else ""
    if w == 0: status = "DERROTA"
    if n == 0: status = "VICTORIA"
    
    suggestion = "Esperando..."
    for r in range(8):
        for c in range(8):
            if b[r][c] == 1:
                for dr, dc in [(-1, -1), (-1, 1)]:
                    if 0 <= r+dr < 8 and 0 <= c+dc < 8 and b[r+dr][c+dc] == 0:
                        suggestion = f"{chr(97+c)}{8-r} ➔ {chr(97+c+dc)}{8-(r+dr)}"
                        break
    return {"board": b, "suggestion": suggestion, "status": status, "count": {"w": w, "n": n}}

@app.get("/game/state")
def get_state(): return get_game_data(board)

@app.post("/game/move")
def make_move(data: dict):
    global board
    s, e = data["start"], data["end"]
    
    # Movimiento Jugador
    board[e[0]][e[1]] = board[s[0]][s[1]]
    board[s[0]][s[1]] = 0
    
    # Respuesta IA
    blacks = [(r, c) for r in range(8) for c in range(8) if board[r][c] == 2]
    if blacks:
        r, c = random.choice(blacks)
        for dr, dc in [(1, -1), (1, 1)]:
            nr, nc = r + dr, c + dc
            if 0 <= nr < 8 and 0 <= nc < 8 and board[nr][nc] == 0:
                board[nr][nc], board[r][c] = 2, 0
                break
    return get_game_data(board)

@app.post("/game/reset")
def reset():
    global board
    board = get_initial_board()
    return get_game_data(board)
