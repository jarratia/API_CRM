import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Spinner from '../componentes/Spinner';

const VerCliente = () => {
  const [cliente, setCliente] = useState({});
  const [cargando, setCargando] = useState(true);

  const { id } = useParams();

  useEffect(() => {
    const obtenerClienteApi = async () => {
      try {
        const url = `http://localhost:4000/clientes/${id}`;
        const response = await fetch(url);
        const result = await response.json();
        setCliente(result);
      } catch (error) {
        console.log(error);
      }

      setCargando(!cargando);
    };
    obtenerClienteApi();
  }, []);

  return (
    <>
      {cargando ? (
        <Spinner />
      ) : Object.keys(cliente).length === 0 ? (
        <p>No hay resultados</p>
      ) : (
        <>
          <h1 className="font-black text-4xl text-blue-900">
            Cliente {cliente.nombre}
          </h1>
          <p className="mt-3">Información del cliente</p>

          <p className="text-2xl text-gray-700 mt-10">
            <span className="uppercase font-bold">Cliente: </span>
            {cliente.nombre}
          </p>

          <p className="text-2xl text-gray-700 ">
            <span className="uppercase font-bold">Email: </span>
            {cliente.email}
          </p>

          {cliente.telefono && (
            <p className="text-2xl text-gray-700 ">
              <span className="uppercase font-bold">telefono: </span>
              {cliente.telefono}
            </p>
          )}

          <p className="text-2xl text-gray-700 ">
            <span className="uppercase font-bold">Empresa: </span>
            {cliente.empresa}
          </p>

          {cliente.notas && (
            <p className="text-2xl text-gray-700 ">
              <span className="uppercase font-bold">Notas: </span>
              {cliente.notas}
            </p>
          )}
        </>
      )}
    </>
  );
};

export default VerCliente;
