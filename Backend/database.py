from motor.motor_asyncio import AsyncIOMotorClient
from bson import ObjectId
from decouple import config

MONGODB_URL = config("MONGODB_URL", default="mongodb://localhost:27017")
client = AsyncIOMotorClient(MONGODB_URL)
database = client.distribuidora_bebidas
pedido_collection = database.get_collection("pedidos")

def pedido_helper(pedido) -> dict:
    return {
        "id": str(pedido["_id"]),
        "cliente_negocio": pedido.get("cliente_negocio"),
        "producto_cajas": pedido.get("producto_cajas"),
        "monto_total": pedido.get("monto_total"),
        "despachado": pedido.get("despachado", False)
    }

# Obtener todos los pedidos
async def get_all_pedidos():
    pedidos = []
    cursor = pedido_collection.find()
    async for pedido in cursor:
        pedidos.append(pedido_helper(pedido))
    return pedidos

# Obtener un pedido por ID
async def get_pedido_by_id(id: str):
    if not ObjectId.is_valid(id):
        return None
    pedido = await pedido_collection.find_one({"_id": ObjectId(id)})
    if pedido:
        return pedido_helper(pedido)
    return None

# Buscar por cliente_negocio (control de duplicados)
async def get_pedido_by_cliente(cliente: str):
    pedido = await pedido_collection.find_one({"cliente_negocio": cliente})
    if pedido:
        return pedido_helper(pedido)
    return None

# Crear pedido
async def create_pedido(data: dict):
    new_pedido = await pedido_collection.insert_one(data)
    created = await pedido_collection.find_one({"_id": new_pedido.inserted_id})
    return pedido_helper(created)

# Actualizar pedido
async def update_pedido(id: str, data: dict):
    if not ObjectId.is_valid(id):
        return None
    pedido = {k: v for k, v in data.items() if v is not None}
    if len(pedido) >= 1:
        update_result = await pedido_collection.update_one(
            {"_id": ObjectId(id)}, {"$set": pedido}
        )
        if update_result.modified_count == 1:
            updated = await pedido_collection.find_one({"_id": ObjectId(id)})
            return pedido_helper(updated)
    existing = await pedido_collection.find_one({"_id": ObjectId(id)})
    if existing:
        return pedido_helper(existing)
    return None

# Eliminar pedido
async def delete_pedido(id: str):
    if not ObjectId.is_valid(id):
        return False
    result = await pedido_collection.delete_one({"_id": ObjectId(id)})
    return result.deleted_count > 0