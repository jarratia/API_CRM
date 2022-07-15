import { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import IniciarSesion from './layout/IniciarSesion';
import Layout from './layout/Layout';
import EditarCliente from './pages/EditarCliente';
import Inicio from './pages/Inicio';
import LoginForm from './pages/LoginForm';
import NuevoCliente from './pages/NuevoCliente';
import VerCliente from './pages/VerCliente';

function App() {
  const [count, setCount] = useState(0);

  return (
    <BrowserRouter>
      <Routes>
        {/* Grupo de ruta de inicio de sesión */}
        <Route path="/" element={<IniciarSesion />}>
          <Route index element={<LoginForm />} />
        </Route>

        {/* Grupo de ruta de listado de clientes */}
        <Route path="/clientes" element={<Layout />}>
          <Route index element={<Inicio />} />
          <Route path="nuevo" element={<NuevoCliente />} />
          <Route path=":id" element={<VerCliente />} />
          <Route path="editar/:id" element={<EditarCliente />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
