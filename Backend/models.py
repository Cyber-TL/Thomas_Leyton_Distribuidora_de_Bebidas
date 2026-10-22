from pydantic import BaseModel, Field
from typing import Optional

class Pedido(BaseModel):
    cliente_negocio: str = Field(..., min_length=2, max_length=100)
    producto_cajas: str = Field(..., min_length=2, max_length=200)
    monto_total: float = Field(..., ge=0)
    despachado: bool = False

    class Config:
        json_schema_extra = {
            "example": {
                "cliente_negocio": "Tienda Don Pedro",
                "producto_cajas": "10 Cajas Cerveza Andina, 5 Cajas Gaseosa Postobón 1.5L",
                "monto_total": 450000.0,
                "despachado": False
            }
        }

class UpdatePedido(BaseModel):
    cliente_negocio: Optional[str] = None
    producto_cajas: Optional[str] = None
    monto_total: Optional[float] = None
    despachado: Optional[bool] = None