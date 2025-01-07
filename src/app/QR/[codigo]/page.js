'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const QR = () => {
  const router = useRouter();
  const { codigo, nombre } = router.query; // Captura automáticamente los parámetros de la URL
  const [tienda, setTienda] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (codigo && nombre) {
      console.log('Código:', codigo); // Muestra el código en la consola
      console.log('Nombre:', nombre); // Muestra el nombre en la consola
      setTienda({ codigo, NOMBRE: nombre }); // Establece la tienda con los datos de la URL
    } else if (!codigo) {
      console.error('Error: Código no proporcionado'); // Mensaje de error en la consola
      setError('Código no proporcionado');
    }
  }, [codigo, nombre]); // Escucha cambios en los parámetros

  return (
    <div>
      {tienda ? (
        <div>
          <h1>{tienda.NOMBRE}</h1>
          <p>Código: {tienda.codigo}</p>
          {/* Agrega más información aquí si es necesario */}
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
