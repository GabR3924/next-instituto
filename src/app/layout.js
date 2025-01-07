"use client";

import { useEffect } from "react";
import { useRouter } from "next/router"; // Para manejar rutas dinámicas
import localFont from "next/font/local";
import "./globals.css";
import { DataProvider } from "@/Context/DataContext";
import { PlanProvider } from "@/Context/PlanContex";
import { FormDataProvider } from "@/Context/FormDataContext";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Vivir Seguros",
  description: "Polizas AP",
};

export default function RootLayout({ children }) {
  const router = useRouter();

  useEffect(() => {
    // Obtén los parámetros de la URL
    const { codigo, nombre } = router.query;

    if (codigo || nombre) {
      console.log("Código detectado en la URL:", codigo);
      console.log("Nombre detectado en la URL:", nombre);
      console.log("Nombre detectado en la URL:", nombre);
    }
  }, [router.query]);

  return (
    <DataProvider>
      <PlanProvider>
        <FormDataProvider>
          <html lang="en">
            <body className={`${geistSans.variable} ${geistMono.variable}`}>
              {children}
            </body>
          </html>
        </FormDataProvider>
      </PlanProvider>
    </DataProvider>
  );
}
