'use client';
import React from "react";
import { Card, CardContent, Typography, Grid, Box } from "@mui/material";
import { GiTowTruck, GiHealing } from "react-icons/gi";
import { FaCar } from "react-icons/fa";
import { FaHandHoldingMedical } from "react-icons/fa";
import { IoIosPeople } from "react-icons/io";

const Info = () => {
  const infoCards = [
    {
      title: "Muerte Accidental",
      icon: <FaCar size={40} style={{ color: "#1976d2" }} />,
      description:
        "Indemnización al Beneficiario designado por la muerte del asegurado a causa de un accidente.",
    },
    {
      title: "Invalidez Permanente",
      icon: <IoIosPeople size={40} style={{ color: "#d32f2f" }} />,
      description:
        "Indemnización al asegurado por lesiones permanentes causadas por un accidente, según las condiciones de la póliza.",
    },
    {
      title: "Gastos Médicos",
      icon: <GiHealing size={40} style={{ color: "#388e3c" }} />,
      description:
        "Indemnización por gastos médicos derivados de lesiones causadas por un accidente, hasta el límite de la cobertura.",
    },
  ];

  return (
    <Box
      id="info"
      sx={{
        p: 4,
        backgroundColor: "#f4f6f8",
        textAlign: "center",
        borderRadius: "8px",
      }}
    >
      <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold" }}>
        ¿Qué incluye nuestra póliza de Accidentes Personales?
      </Typography>
      <Typography
        variant="body1"
        sx={{
          mb: 4,
          color: "#555",
        }}
      >
        Este producto ofrece la posibilidad de indemnizar al asegurado o a quien
        corresponda por las consecuencias que puedan ocurrir a causa de un
        accidente en las siguientes coberturas:
      </Typography>

      <Grid container spacing={4} justifyContent="center">
        {infoCards.map((card, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card
              sx={{
                height: "100%",
                p: 2,
                border: "1px solid #e0e0e0",
                boxShadow: 1,
              }}
            >
              <CardContent sx={{ textAlign: "center" }}>
                <Box sx={{ mb: 2 }}>{card.icon}</Box>
                <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
                  {card.title}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {card.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Info;
