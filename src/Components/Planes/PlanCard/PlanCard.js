"use client";
import React from 'react';
import { Button } from '@mui/material';
import { useRouter } from 'next/navigation'; // Importar el hook useRouter de Next.js
import styles from './PlanCard.module.css'; // Estilos CSS

const PlanCard = ({ plan, onSelect }) => {
  const router = useRouter(); // Instancia del hook useRouter

  const handleSelect = () => {
    onSelect(); // Llamamos a la función onSelect para actualizar el contexto
    router.push('/Formulario'); // Redirigimos al formulario, y a un fieldset específico
  };

  return (
    <div className={styles.card}>
      <h3>{plan.title}</h3>
      <p><strong>Precio: </strong>${plan.precio}</p>

      <div className={styles.planDetails}>
        {Object.entries(plan.data).map(([key, value]) => (
          <p key={key}>
            <strong>{value}</strong>: {plan.asegurado[key]}
          </p>
        ))}
      </div>

      <Button 
        variant="contained" 
        color="primary" 
        onClick={handleSelect} // Usamos el nuevo método handleSelect
      >
        Seleccionar Plan
      </Button>
    </div>
  );
};

export default PlanCard;
