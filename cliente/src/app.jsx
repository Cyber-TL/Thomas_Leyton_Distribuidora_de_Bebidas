import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Homepage from './pages/Homepage';
import PedidoForm from './pages/PedidoForm';

function App() {
  return (
    <BrowserRouter>
      <div className="container mx-auto px-4 max-w-5xl">
        <Navbar />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/pedidos/new" element={<PedidoForm />} />
          <Route path="/pedidos/:id" element={<PedidoForm />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;