import { useNavigate } from 'react-router-dom';

const Cliente = ({ cliente, handleDelete }) => {
  const navigate = useNavigate();
  const { nombre, empresa, email, telefono, notas, id } = cliente;
  return (
    <tr className="border hover:bg-blue-50">
      <td className="p-3">{nombre}</td>
      <td className="p-3">
        <p>
          <span className="text-gray-800 uppercase font-bold">Email: </span>
          {email}
        </p>
        <p>
          <span className="text-gray-800 uppercase font-bold">Tel: </span>
          {telefono}
        </p>
      </td>
      <td className="p-3">{empresa}</td>
      <td className="p-3">
        <button
          className="bg-gray-600 hover:bg-gray-700 block w-full text-white p-2 uppercase font-bold rounded-lg text-xs"
          type="button"
          onClick={() => navigate(`/clientes/${id}`)}
        >
          Ver
        </button>
        <button
          className="bg-blue-600 hover:bg-blue-700 block w-full text-white p-2 uppercase font-bold rounded-lg text-xs mt-3"
          type="button"
          onClick={() => navigate(`/clientes/editar/${id}`)}
        >
          Editar
        </button>
        <button
          className="bg-red-600 hover:bg-red-700 block w-full text-white p-2 uppercase font-bold rounded-lg text-xs mt-3"
          type="button"
          onClick={() => handleDelete(id)}
        >
          Eliminar
        </button>
      </td>
    </tr>
  );
};

export default Cliente;
