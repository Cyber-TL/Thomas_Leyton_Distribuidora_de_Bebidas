import PedidoCard from './PedidoCard';

export default function PedidoList({ pedidos, onPedidoUpdated }) {
  if (!pedidos || pedidos.length === 0) {
    return (
      <div className="text-center text-slate-400 mt-20">
        <h2 className="text-2xl font-bold">No hay pedidos registrados</h2>
        <p className="mt-2 text-sm">Haz clic en "+ Nuevo Pedido" para comenzar.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      {pedidos.map((pedido) => (
        <PedidoCard key={pedido.id} pedido={pedido} onPedidoUpdated={onPedidoUpdated} />
      ))}
    </div>
  );
}