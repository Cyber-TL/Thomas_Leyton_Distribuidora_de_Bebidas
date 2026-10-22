import { useNavigate } from 'react-router-dom';
import { updatePedido } from '../api/pedidos';

export default function PedidoCard({ pedido, onPedidoUpdated }) {
  const navigate = useNavigate();

  const handleToggleDespachado = async (e) => {
    e.stopPropagation();
    try {
      await updatePedido(pedido.id, { despachado: !pedido.despachado });
      if (onPedidoUpdated) onPedidoUpdated();
    } catch (error) {
      console.error("Error al actualizar estado:", error);
    }
  };

  return (
    <div
      onClick={() => navigate(`/pedidos/${pedido.id}`)}
      className="bg-zinc-800 p-5 rounded-lg hover:cursor-pointer hover:bg-zinc-750 transition border border-zinc-700 flex flex-col justify-between shadow-md"
    >
      <div>
        <div className="flex justify-between items-start mb-2">
          <h2 className="text-xl font-bold text-amber-400">{pedido.cliente_negocio}</h2>
          <button
            onClick={handleToggleDespachado}
            title={pedido.despachado ? "Marcar como pendiente" : "Marcar como despachado"}
            className="p-1 rounded hover:bg-zinc-700 transition"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill={pedido.despachado ? "currentColor" : "none"}
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className={`w-7 h-7 ${pedido.despachado ? "text-green-500" : "text-gray-400"}`}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>
          </button>
        </div>

        <p className="text-slate-300 text-sm mb-3">
          <span className="font-semibold text-slate-400">Cajas/Productos:</span> {pedido.producto_cajas}
        </p>
      </div>

      <div className="mt-3 pt-3 border-t border-zinc-700 flex justify-between items-center text-sm">
        <span className="text-lg font-bold text-white">
          ${Number(pedido.monto_total).toLocaleString("es-CO")}
        </span>
        <span
          className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${
            pedido.despachado ? "bg-green-900 text-green-300" : "bg-yellow-900 text-yellow-300"
          }`}
        >
          {pedido.despachado ? "Despachado" : "Pendiente"}
        </span>
      </div>
    </div>
  );
}