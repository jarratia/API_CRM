import { useEffect, useState } from 'react';
import Cliente from '../componentes/Cliente';

const Inicio = () => {
  const [clientes, setClientes] = useState([]);

  useEffect(() => {
    obtenerClientesApi();
  }, []);

  const obtenerClientesApi = async () => {
    try {
      const url =
        'https://my-json-server.typicode.com/jarratia/API_CRM/clientes';
      const response = await fetch(url);
      const result = await response.json();
      console.log(result);
      setClientes(result);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    const confirmar = confirm('¿Deseas eliminar este cliente?');

    if (confirmar) {
      try {
        const url = `http://localhost:4000/clientes/${id}`;
        const response = await fetch(url, {
          method: 'DELETE',
        });
        await response.json();

        const arrayClientes = clientes.filter((cliente) => cliente.id !== id);

        setClientes(arrayClientes);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <>
      <h1 className="font-black text-4xl text-blue-900">Clientes</h1>
      <p className="mt-3">Administra tus clientes</p>

      <table className="w-full mt-5 table-auto shadow bg-gray-100">
        <thead className="bg-blue-800 text-white">
          <tr>
            <th className="p-2">Nombre</th>
            <th className="p-2">Contacto</th>
            <th className="p-2">Empresa</th>
            <th className="p-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {clientes.map((cliente) => (
            <Cliente
              key={cliente.id}
              cliente={cliente}
              handleDelete={handleDelete}
            />
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Inicio;
