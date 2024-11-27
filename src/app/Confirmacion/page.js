"use client";

import React from "react";
import Confirmacion from "./Confirmacion"; // Asegúrate de que la ruta sea correcta
import Nav from "../../Components/Nav/Nav"; // Componente de navegación

const ConfirmacionPage = () => {
  return (
    <>
      <Nav /> {/* Barra de navegación */}
      <main >
        <Confirmacion />
      </main>
    </>
  );
};

export default ConfirmacionPage;
