"use client";

import React from "react";
import Formulario from "./Formulario"; // Asegúrate de que la ruta sea correcta
import styles from "./Form.module.css"; // Importar estilos
import Nav from "../../Components/Nav/Nav"; // Componente de navegación

const FormPage = () => {
  return (
    <>
      <Nav /> {/* Barra de navegación */}
      <main className={styles.main}>
        <Formulario />
      </main>
    </>
  );
};

export default FormPage;
