import React from 'react';

const Alerta = ({ children }) => {
  return (
    <div className="text-center my-4 bg-red-600 text-white p-3 uppercase font-bold">
      {children}
    </div>
  );
};

export default Alerta;
