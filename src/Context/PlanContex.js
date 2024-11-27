'use client'
import { createContext, useState, useContext } from 'react';

// Crea el contexto
const PlanContext = createContext();

// Proveedor de contexto
export const PlanProvider = ({ children }) => {
  const [selectedPlan, setSelectedPlan] = useState(null); // Estado para el plan seleccionado

  const selectPlan = (plan) => {
    setSelectedPlan(plan); // Actualiza el plan seleccionado
    console.log("plan seleccionado:",selectPlan)
  };

  return (
    <PlanContext.Provider value={{ selectedPlan, selectPlan }}>
      {children}
    </PlanContext.Provider>
  );
};

// Hook para acceder al contexto
export const usePlanContext = () => {
  return useContext(PlanContext);
};

