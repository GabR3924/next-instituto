'use client';
import React from 'react';
import { Button, Card, CardContent, Typography, Box } from '@mui/material';
import { useRouter } from 'next/navigation'; // Hook de navegación de Next.js

const PlanCard = ({ plan, onSelect }) => {
  const router = useRouter(); // Instancia del hook useRouter

  const handleSelect = () => {
    onSelect(); // Llamamos a la función onSelect para actualizar el contexto
    router.push('/Formulario'); // Redirigimos al formulario
  };

  return (
    <Card
      sx={{
        maxWidth: 345, // Ancho de la tarjeta
        borderRadius: 3, // Borde redondeado
        boxShadow: 3, // Sombra suave
        transition: "transform 0.3s", // Transición para efecto de hover
        "&:hover": {
          transform: "scale(1.05)", // Aumenta ligeramente el tamaño en hover
          boxShadow: "0 6px 20px rgba(0,0,0,0.1)", // Sombra más intensa en hover
        },
        textAlign: "left", // Alineación del texto a la izquierda
        padding: 2, // Ajuste de padding
        marginBottom: 3, // Espaciado al final de cada tarjeta
      }}
    >
      <CardContent>
        <Typography variant="h5" sx={{ fontWeight: "bold", mb: 1, color: "#333" }}>
          {plan.title}
        </Typography>
        <Typography variant="h6" sx={{ color: "#1976d2", mb: 2 }}>
          Precio: ${plan.precio}
        </Typography>
        <Typography variant="h6" sx={{ color: "#1976d2", mb: 2 }}>
          Precio Bolivares: {plan.bolivares}Bs
        </Typography>
        <Box sx={{ mb: 3 }}>
          {Object.entries(plan.data).map(([key, value]) => (
            <Typography key={key} variant="body2" sx={{ mb: 0.5 }}>
              <strong>{value}:</strong> {plan.asegurado[key]}
            </Typography>
          ))}
        </Box>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          sx={{
            backgroundColor: "#1976d2",
            "&:hover": {
              backgroundColor: "#1565c0", // Cambio de color al pasar el cursor
            },
          }}
          onClick={handleSelect} // Llamamos al método de selección
        >
          Seleccionar Plan
        </Button>
      </CardContent>
    </Card>
  );
};

export default PlanCard;
