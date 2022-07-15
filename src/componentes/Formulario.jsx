import React from 'react';
import { Formik, Form, Field } from 'formik';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import Alerta from './Alerta';
import Spinner from './Spinner';

const Formulario = ({ cliente, cargando }) => {
  const navigate = useNavigate();

  // Schema de yup
  const nuevoClienteSchema = Yup.object().shape({
    nombre: Yup.string()
      .min(3, 'El nombre es muy corto')
      .max(20, 'El nombre es muy largo')
      .required('El nombre del cliente es obligatorio'),

    empresa: Yup.string().required('El nombre de la empresa es obligatorio'),

    email: Yup.string()
      .required('El email es obligatorio')
      .email('El correo no es válido'),

    telefono: Yup.number()
      .typeError('Número no válido')
      .integer('Número no válido')
      .positive('Número no válido'),
  });

  const handleSubmit = async (valores) => {
    try {
      let response;

      if (cliente.id) {
        //Editando registro
        const url = `http://localhost:4000/clientes/${cliente.id}`;
        response = await fetch(url, {
          method: 'PUT',
          body: JSON.stringify(valores),
          headers: {
            'Content-Type': 'application/json',
          },
        });
      } else {
        //Nuevo registro
        const url = 'http://localhost:4000/clientes';
        response = await fetch(url, {
          method: 'POST',
          body: JSON.stringify(valores),
          headers: {
            'Content-Type': 'application/json',
          },
        });
      }

      await response.json();

      navigate('/clientes');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {cargando ? (
        <Spinner />
      ) : (
        <div className="bg-gray-100 mt-10 px-5 py-10 rounded-lg shadow-md md:w-3/4 mx-auto">
          <h1 className="text-blue-300 font-bold text-xl uppercase text-center">
            {cliente.nombre ? 'Editar cliente' : 'Agregar cliente'}
          </h1>

          <Formik
            initialValues={{
              nombre: cliente?.nombre ?? '',
              empresa: cliente?.empresa ?? '',
              email: cliente?.email ?? '',
              telefono: cliente?.telefono ?? '',
              notas: cliente?.notas ?? '',
            }}
            enableReinitialize={true}
            onSubmit={async (values, { resetForm }) => {
              await handleSubmit(values);
              resetForm();
            }}
            validationSchema={nuevoClienteSchema}
          >
            {({ errors, touched }) => {
              return (
                <Form className="mt-10">
                  <div className="mb-4">
                    <label className="text-gray-400" htmlFor="nombre">
                      Nombre:
                    </label>
                    <Field
                      id="nombre"
                      type="text"
                      className="mt-2 block p-3 w-full bg-white"
                      placeholder="Ingrese nombre del cliente"
                      name="nombre"
                    />
                    {errors.nombre && touched.nombre ? (
                      <Alerta>{errors.nombre}</Alerta>
                    ) : null}
                  </div>

                  <div className="mb-4">
                    <label className="text-gray-400" htmlFor="empresa">
                      Empresa:
                    </label>
                    <Field
                      id="empresa"
                      type="text"
                      className="mt-2 block p-3 w-full bg-white"
                      placeholder="Ingrese empresa del cliente"
                      name="empresa"
                    />
                    {errors.empresa && touched.empresa ? (
                      <Alerta>{errors.empresa}</Alerta>
                    ) : null}
                  </div>

                  <div className="mb-4">
                    <label className="text-gray-400" htmlFor="email">
                      Email:
                    </label>
                    <Field
                      id="email"
                      type="email"
                      className="mt-2 block p-3 w-full bg-white"
                      placeholder="Ingrese email del cliente"
                      name="email"
                    />
                    {errors.email && touched.email ? (
                      <Alerta>{errors.email}</Alerta>
                    ) : null}
                  </div>

                  <div className="mb-4">
                    <label className="text-gray-400" htmlFor="telefono">
                      Teléfono:
                    </label>
                    <Field
                      id="telefono"
                      type="tel"
                      className="mt-2 block p-3 w-full bg-white"
                      placeholder="Ingrese teléfono del cliente"
                      name="telefono"
                    />
                    {errors.telefono && touched.telefono ? (
                      <Alerta>{errors.telefono}</Alerta>
                    ) : null}
                  </div>

                  <div className="mb-4">
                    <label className="text-gray-400" htmlFor="notas">
                      Notas:
                    </label>
                    <Field
                      as="textarea"
                      id="notas"
                      type="text"
                      className="mt-2 block p-3 w-full bg-white h-40"
                      placeholder="Ingrese notas del cliente"
                      name="notas"
                    />
                  </div>
                  <input
                    className="mt-5 w-full bg-blue-900 p-3 text-white uppercase font-bold text-lg"
                    type="submit"
                    value={
                      cliente.nombre ? 'Editar cliente' : 'Agregar cliente'
                    }
                  />
                </Form>
              );
            }}
          </Formik>
        </div>
      )}
    </>
  );
};

Formulario.defaultProps = {
  cliente: {},
  cargando: false,
};

export default Formulario;
