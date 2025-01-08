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
    const nombreParam = searchParams.get("nombre");

    if (codigoParam) {
      setFormData((prevData) => ({
        ...prevData,
        codigo: codigoParam, // Guarda el código en formData
      }));
      console.log("Código detectado:", codigoParam);
    } else {
      console.error("Código no detectado en la URL.");
    }

    if (nombreParam) {
      setFormData((prevData) => ({
        ...prevData,
        nombre: nombreParam, // Guarda el nombre en formData
      }));
      console.log("Nombre detectado:", nombreParam);
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
