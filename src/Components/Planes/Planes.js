"use client";
import React from 'react';
import { usePlanContext } from '../../Context/PlanContex'; // Importamos el contexto
import PlanCard from './PlanCard/PlanCard'; // Importamos el componente de tarjeta
import cards from '../../DataCards'; // Importamos los datos de los planes

const Planes = () => {
  const { selectedPlan, selectPlan } = usePlanContext(); // Obtenemos la función selectPlan

  return (
    <div>
      <h2>Planes Disponibles</h2>
      <div className="plan-cards-container">
        {cards.map((plan, index) => (
          <PlanCard 
            key={index} 
            plan={plan} 
            onSelect={() => selectPlan(plan)} // Pasamos onSelect a cada tarjeta
          />
        ))}
      </div>

      {/* Si un plan está seleccionado, mostramos un mensaje */}
      {selectedPlan && (
        <div>
          <h3>Plan Seleccionado:</h3>
          <p>{selectedPlan.title} - ${selectedPlan.precio}</p>
        </div>
      )}
    </div>
  );
};

export default Planes;
