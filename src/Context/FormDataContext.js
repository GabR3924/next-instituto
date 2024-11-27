'use client'
import React, { createContext, useState, useContext, useEffect } from "react";

// Creamos el contexto
const FormDataContext = createContext();

// Creador del proveedor del contexto
export const FormDataProvider = ({ children }) => {
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    fechaNacimiento: "",
    direccion: "",
    estado: "",
    correo: "",
    cedulaImagen: null,
    banco: "",
    cedula: "",
    telefono: "",
    referencia: "",
    telefonoCodigo: "412", // Código de área predeterminado
  });

   // useEffect para escuchar cambios en formData
   useEffect(() => {
    console.log("formData actualizado:", formData);
  }, [formData]); // Este efecto se ejecutará cada vez que formData cambie

  return (
    <FormDataContext.Provider value={{ formData, setFormData }}>
      {children}
    </FormDataContext.Provider>
  );
};

// Hook para acceder al contexto
export const useFormData = () => {
  return useContext(FormDataContext);
};
