// DataCards.js
const fetchTasaBolivares = async () => {
  try {
    // Aquí haces la llamada a la API para obtener la tasa de cambio
    const response = await fetch('https://rcv.gocastgroup.com:2053/data/tasa-dolar'); // Cambia esta URL por la de tu API
    const data = await response.json();
    console.log("tasa",data.precio)
    return data.precio; // Suponiendo que la API devuelve un campo 'tasa'
  } catch (error) {
    console.error('Error al obtener la tasa de bolívares:', error);
    return 1; // Si hay error, devolvemos 1 por defecto (sin cambio)
  }
};

// Esta función se encarga de calcular el valor en bolívares para cada plan
const calculateBolivaresForPlans = async (cards) => {
  const tasa = await fetchTasaBolivares(); // Llamamos la API para obtener la tasa
  return cards.map((card) => {
    return {
      ...card,
      bolivares: (parseFloat(card.precio) * tasa).toFixed(2), // Calculamos bolívares
    };
  });
};

// Función para obtener las tarjetas con la tasa calculada
const getCards = async () => {
  const cards = [
    {
      title: "Plan I",
      precio: "10", 
      data: {
        cinco: "Muerte Accidental (4.000,00$US)",
        seis: "Invalidez Permanente (4.000,00$US)",
        siete: "Gastos Médicos (400,00$US)",
      },
      asegurado: {
        cinco: "4.000,00$US",
        seis: "4.000,00$US",
        siete: "400,00$US",
      },
    },
    {
      title: "Plan II",
      precio: "20",
      data: {
        cinco: "Muerte Accidental (8.000,00$US)",
        seis: "Invalidez Permanente (8.000,00$US)",
        siete: "Gastos Médicos (800,00$US)",
      },
      asegurado: {
        cinco: "8.000,00$US",
        seis: "8.000,00$US",
        siete: "800,00$US",
      },
    },
  ];

  return await calculateBolivaresForPlans(cards); // Calculamos y retornamos las tarjetas con el valor en bolívares
};

export default getCards;
