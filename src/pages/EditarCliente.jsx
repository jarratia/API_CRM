import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import Formulario from '../componentes/Formulario';

const EditarCliente = () => {
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
    <div>
      <h1 className="font-black text-4xl text-blue-900">Editar cliente</h1>
      <p className="mt-3">
        Utiliza el formulario para modificar los datos del cliente
      </p>

      {cliente?.nombre && <Formulario cliente={cliente} cargando={cargando} />}
    </div>
  );
};

export default EditarCliente;
