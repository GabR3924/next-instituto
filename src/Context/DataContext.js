"use client"
import { createContext, useContext, useState } from 'react';

// Crear el contexto
const DataContext = createContext();

// Crear un hook para acceder al contexto
export const useDataContext = () => useContext(DataContext);

// Crear el proveedor que va a envolver la aplicación
export const DataProvider = ({ children }) => {
  // Definir el estado global (en tu caso, los datos a enviar)
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    servicios: [],  // Datos de los servicios seleccionados
    extras: [],     // Datos de los extras
    total: 0,       // Total calculado
  });

  // Función para actualizar los datos
  const updateData = (newData) => {
    setFormData((prevState) => ({ ...prevState, ...newData }));
  };

  // Función para resetear los datos (opcional)
  const resetData = () => {
    setFormData({
      nombre: '',
      email: '',
      telefono: '',
      servicios: [],
      extras: [],
      total: 0,
    });
  };

  return (
    <DataContext.Provider value={{ formData, updateData, resetData }}>
      {children}
    </DataContext.Provider>
  );
};
