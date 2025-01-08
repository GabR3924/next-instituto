'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation'; // Para capturar parámetros de la URL
import { useCodigo } from "@/Context/CodigoContext"; // Importar el contexto

const QR = () => {
  const searchParams = useSearchParams();
  const codigo = searchParams.get('codigo'); // Obtiene el valor del parámetro "codigo"
  const nombre = searchParams.get('nombre'); // Obtiene el valor del parámetro "nombre"

  const { setCodigo, setNombre } = useCodigo(); // Acceder al contexto para actualizar los valores

  const [tienda, setTienda] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (codigo && nombre) {
      console.log('Código:', codigo); // Muestra el código en la consola
      console.log('Nombre:', nombre); // Muestra el nombre en la consola

      setCodigo(codigo); // Actualiza el contexto con el código
      setNombre(nombre); // Actualiza el contexto con el nombre

      setTienda({ codigo, NOMBRE: nombre }); // Establece la tienda con los datos de la URL
    } else if (!codigo) {
      console.error('Error: Código no proporcionado'); // Mensaje de error en la consola
      setError('Código no proporcionado');
    }
  }, [codigo, nombre, setCodigo, setNombre]); // Escucha cambios en los parámetros y funciones de contexto

  return (
    <div>
      {tienda ? (
        <div>
          <h1>{tienda.NOMBRE}</h1>
          <p>Código: {tienda.codigo}</p>
        </div>
      ) : error ? (
        <div>
          <h1>Error: {error}</h1>
        </div>
      ) : (
        <div>
          <h1>Cargando...</h1>
        </div>
      )}
    </div>
  );
};

export default QR;
