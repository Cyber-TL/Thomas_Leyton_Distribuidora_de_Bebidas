import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <header className="flex justify-between items-center my-6 bg-zinc-800 p-5 rounded-lg border border-zinc-700 shadow-md">
      <Link to="/">
        <h1 className="text-2xl font-bold text-white hover:text-amber-400 transition-colors">
          Distribuidora de Bebidas 🍻
        </h1>
      </Link>
      <Link
        to="/pedidos/new"
        className="bg-amber-500 hover:bg-amber-600 text-black font-semibold px-4 py-2 rounded-md transition-colors"
      >
        + Nuevo Pedido
      </Link>
    </header>
  );
}