import { useEffect, useState } from 'react';
import { fetchPedidos } from '../api/pedidos';
import PedidoList from '../components/PedidoList';

export default function Homepage() {
  const [pedidos, setPedidos] = useState([]);

  const loadPedidos = async () => {
    try {
      const res = await fetchPedidos();
      setPedidos(res.data);
    } catch (err) {
      console.error("Error al cargar pedidos:", err);
    }
  };

  useEffect(() => {
    loadPedidos();
  }, []);

  return (
    <main>
      <PedidoList pedidos={pedidos} onPedidoUpdated={loadPedidos} />
    </main>
  );
}