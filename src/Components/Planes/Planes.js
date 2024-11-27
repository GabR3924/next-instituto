'use client';
import React, { useState, useEffect } from 'react';
import { usePlanContext } from '../../Context/PlanContex'; // Importamos el contexto
import PlanCard from './PlanCard/PlanCard'; // Importamos el componente de tarjeta
import getCards from '../../DataCards'; // Importamos la función para obtener los planes
import { Box, Typography, Grid, Paper } from '@mui/material';

const Planes = () => {
  const { selectedPlan, selectPlan } = usePlanContext(); // Obtenemos la función selectPlan
  const [cards, setCards] = useState([]); // Estado para almacenar los planes actualizados

  // Llamamos a la función getCards para obtener los planes con la tasa de cambio actualizada
  useEffect(() => {
    const fetchCards = async () => {
      const updatedCards = await getCards(); // Llamamos a getCards que actualizará bolivares
      setCards(updatedCards); // Actualizamos el estado con los planes obtenidos
    };

    fetchCards(); // Llamamos a la función cuando el componente se monta
  }, []); // Esto se ejecuta solo una vez cuando el componente se monta

  return (
    <Box
      sx={{
        p: 4,
        backgroundColor: "white",
        borderRadius: "8px",
        textAlign: "center",
      }}
    >
      <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold" }}>
        Planes Disponibles
      </Typography>

      <Grid container spacing={4} justifyContent="center" sx={{ mt: 2 }}>
        {cards.length > 0 ? (
          cards.map((plan, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Paper
                elevation={3}
                sx={{
                  p: 2,
                  cursor: "pointer",
                  transition: "transform 0.3s",
                  "&:hover": {
                    transform: "scale(1.05)",
                    boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
                  },
                }}
              >
                <PlanCard 
                  plan={plan} // Pasamos el plan completo
                  onSelect={() => selectPlan(plan)} // Pasamos la función onSelect que llama a selectPlan
                />
              </Paper>
            </Grid>
          ))
        ) : (
          <Typography variant="h6">Cargando planes...</Typography>
        )}
      </Grid>

      {/* {selectedPlan && (
        <Box
          sx={{
            mt: 4,
            p: 3,
            backgroundColor: "#e3f2fd",
            borderRadius: "8px",
            textAlign: "left",
          }}
        >
          <Typography variant="h5" sx={{ fontWeight: "bold", mb: 1 }}>
            Plan Seleccionado:
          </Typography>
          <Typography variant="body1">
            {selectedPlan.title} - ${selectedPlan.precio} - Bs. {selectedPlan.bolivares}
          </Typography>
        </Box>
      )} */}
    </Box>
  );
};

export default Planes;
