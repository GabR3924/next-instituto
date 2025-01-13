'use client'
import React, { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useFormData } from "..//Context/FormDataContext"; // Asegúrate de importar el hook correctamente
import Nav from "@/Components/Nav/Nav";
import Hero from "@/Components/Hero/Hero";
import Planes from "@/Components/Planes/Planes";
import Info from "../app/Info/Info";
import Footer from "./Footer/Footer";

export default function Home() {
  const searchParams = useSearchParams(); // Hook para capturar parámetros de la URL
  const { formData, setFormData } = useFormData(); // Accede al contexto de formData

  useEffect(() => {
    const codigoParam = searchParams.get("codigo");

    setFormData((prevData) => ({
      ...prevData,
      codigo: codigoParam || "80000", // Asigna "80000" si no se encuentra el código
    }));

    if (codigoParam) {
      console.log("Código detectado:", codigoParam);
    } else {
      console.warn("Código no detectado, asignando valor predeterminado: 80000");
    }
  }, [searchParams, setFormData]); // Escucha cambios en los parámetros de la URL

  return (
    <div>
      <Nav />
      <Hero />
      <Info />
      <Planes />
      <Footer />
    </div>
  );
}
