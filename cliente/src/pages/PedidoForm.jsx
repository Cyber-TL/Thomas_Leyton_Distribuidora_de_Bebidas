import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createPedido, fetchPedido, updatePedido, deletePedido } from '../api/pedidos';

export default function PedidoForm() {
  const [pedido, setPedido] = useState({
    cliente_negocio: '',
    producto_cajas: '',
    monto_total: '',
    despachado: false
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    if (params.id) {
      fetchPedido(params.id)
        .then((res) => {
          setPedido({
            cliente_negocio: res.data.cliente_negocio,
            producto_cajas: res.data.producto_cajas,
            monto_total: res.data.monto_total,
            despachado: res.data.despachado
          });
        })
        .catch((err) => console.error(err));
    }
  }, [params.id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const payload = {
        ...pedido,
        monto_total: parseFloat(pedido.monto_total)
      };

      if (!params.id) {
        await createPedido(payload);
      } else {
        await updatePedido(params.id, payload);
      }
      navigate('/');
    } catch (err) {
      if (err.response && err.response.data && err.response.data.detail) {
        setError(err.response.data.detail);
      } else {
        setError('Ocurrió un error al procesar el pedido.');
      }
    }
  };

  const handleDelete = async () => {
    if (window.confirm('¿Está seguro de eliminar este pedido?')) {
      try {
        await deletePedido(params.id);
        navigate('/');
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[75vh]">
      <form onSubmit={handleSubmit} className="bg-zinc-800 max-w-md w-full p-7 rounded-md border border-zinc-700 shadow-xl">
        <h2 className="text-2xl font-bold mb-4 text-amber-400">
          {params.id ? 'Editar Pedido' : 'Registrar Nuevo Pedido'}
        </h2>

        {error && (
          <div className="bg-red-500 text-white p-2 mb-4 rounded text-sm font-semibold">
            {error}
          </div>
        )}

        <label className="block text-xs font-semibold text-slate-300 mb-1">Cliente / Negocio</label>
        <input
          type="text"
          placeholder="Ej: Depósito y Tienda El Triunfo"
          value={pedido.cliente_negocio}
          onChange={(e) => setPedido({ ...pedido, cliente_negocio: e.target.value })}
          className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md mb-4 border border-zinc-600 focus:outline-none focus:border-amber-400"
          required
        />

        <label className="block text-xs font-semibold text-slate-300 mb-1">Productos y Cajas</label>
        <textarea
          rows={3}
          placeholder="Ej: 10 cajas Cerveza Poker, 5 cajas Gaseosa Manzana 2.5L"
          value={pedido.producto_cajas}
          onChange={(e) => setPedido({ ...pedido, producto_cajas: e.target.value })}
          className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md mb-4 border border-zinc-600 focus:outline-none focus:border-amber-400"
          required
        />

        <label className="block text-xs font-semibold text-slate-300 mb-1">Monto Total ($ COP)</label>
        <input
          type="number"
          step="0.01"
          placeholder="Ej: 480000"
          value={pedido.monto_total}
          onChange={(e) => setPedido({ ...pedido, monto_total: e.target.value })}
          className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md mb-4 border border-zinc-600 focus:outline-none focus:border-amber-400"
          required
        />

        <div className="flex items-center gap-2 mb-6">
          <input
            type="checkbox"
            id="despachado"
            checked={pedido.despachado}
            onChange={(e) => setPedido({ ...pedido, despachado: e.target.checked })}
            className="w-4 h-4 accent-amber-500 rounded cursor-pointer"
          />
          <label htmlFor="despachado" className="text-sm text-slate-200 cursor-pointer">
            ¿Pedido Despachado?
          </label>
        </div>

        <div className="flex justify-between items-center gap-3">
          <button
            type="submit"
            className="flex-1 bg-amber-500 hover:bg-amber-600 text-black font-semibold px-4 py-2 rounded-md transition"
          >
            {params.id ? 'Guardar Cambios' : 'Crear Pedido'}
          </button>

          {params.id && (
            <button
              type="button"
              onClick={handleDelete}
              className="bg-red-600 hover:bg-red-700 text-white font-semibold px-4 py-2 rounded-md transition"
            >
              Eliminar
            </button>
          )}
        </div>
      </form>
    </div>
  );
}