import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:8000/api/pedidos'
});

export const fetchPedidos = () => API.get('/');
export const fetchPedido = (id) => API.get(`/${id}`);
export const createPedido = (pedido) => API.post('/', pedido);
export const updatePedido = (id, pedido) => API.put(`/${id}`, pedido);
export const deletePedido = (id) => API.delete(`/${id}`);