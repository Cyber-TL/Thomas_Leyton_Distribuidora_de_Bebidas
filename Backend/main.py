from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from decouple import config
from router.pedidos import router as PedidosRouter

app = FastAPI(title="API Distribuidora de Bebidas - Thomas Leyton")

origins = [
    config("FRONTEND_URL", default="http://localhost:5173"),
    "http://127.0.0.1:5173"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(PedidosRouter)

@app.get("/")
def read_root():
    return {"message": "Bienvenido al Sistema de Gestión de Pedidos - Distribuidora de Bebidas"}