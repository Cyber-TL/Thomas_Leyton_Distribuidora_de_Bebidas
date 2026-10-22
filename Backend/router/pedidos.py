from fastapi import APIRouter, HTTPException, status
from models import Pedido, UpdatePedido
from database import (
    get_all_pedidos,
    get_pedido_by_id,
    get_pedido_by_cliente,
    create_pedido,
    update_pedido,
    delete_pedido
)

router = APIRouter(prefix="/api/pedidos", tags=["Pedidos"])

@router.get("/")
async def fetch_pedidos():
    return await get_all_pedidos()

@router.get("/{id}")
async def fetch_pedido(id: str):
    pedido = await get_pedido_by_id(id)
    if not pedido:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Pedido con id {id} no fue encontrado"
        )
    return pedido

@router.post("/", status_code=status.HTTP_201_CREATED)
async def add_pedido(pedido: Pedido):
    existente = await get_pedido_by_cliente(pedido.cliente_negocio)
    if existente and not existente["despachado"]:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Ya existe un pedido pendiente para el cliente '{pedido.cliente_negocio}'"
        )
    return await create_pedido(pedido.model_dump())

@router.put("/{id}")
async def edit_pedido(id: str, pedido: UpdatePedido):
    updated = await update_pedido(id, pedido.model_dump(exclude_unset=True))
    if not updated:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Pedido con id {id} no encontrado para actualizar"
        )
    return updated

@router.delete("/{id}")
async def remove_pedido(id: str):
    deleted = await delete_pedido(id)
    if not deleted:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Pedido con id {id} no encontrado"
        )
    return {"message": "Pedido eliminado correctamente"}