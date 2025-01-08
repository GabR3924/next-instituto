'use client'
import Image from "next/image";
import styles from "./page.module.css";
import Nav from "@/Components/Nav/Nav";
import Hero from "@/Components/Hero/Hero";
import Planes from "@/Components/Planes/Planes";
import Info from "../app/Info/Info";
import Footer from "./Footer/Footer";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

export default function Home() {
  const searchParams = useSearchParams(); // Hook para capturar parámetros de la URL
  const [codigo, setCodigo] = useState(null);
  const [nombre, setNombre] = useState(null);

  useEffect(() => {
    const codigoParam = searchParams.get("codigo");
    const nombreParam = searchParams.get("nombre");

    if (codigoParam) {
      setCodigo(codigoParam); // Guarda el código en el estado
      console.log("Código detectado:", codigoParam); // Muestra el código en consola
    } else {
      console.error("Código no detectado en la URL.");
    }

    if (nombreParam) {
      setNombre(nombreParam); // Guarda el nombre en el estado
      console.log("Nombre detectado:", nombreParam); // Muestra el nombre en consola
    }
  }, [searchParams]); // Escucha cambios en los parámetros de la URL

  return (
    <div className={styles.page}>
      <Nav />
      <Hero />
      <Info />
      <Planes />
      <Footer />
    </div>
  );
}
