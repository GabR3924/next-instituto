"use client";

import React, { useState } from "react";
import { TextField, Button, Select, MenuItem, InputLabel, FormControl, Typography, Stepper, Step, StepLabel, Box } from "@mui/material";
import { usePlanContext } from "@/Context/PlanContex"; // Contexto para obtener el plan seleccionado

const Formulario = () => {
  const { selectedPlan } = usePlanContext(); // Obtener el plan seleccionado del contexto

  // Estado para controlar el paso actual
  const [currentStep, setCurrentStep] = useState(0);

  // Estado para los campos del formulario
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    fechaNacimiento: "",
    genero: "",
    estado: "",
    ciudad: "",
    cedulaImagen: null,
    banco: "",
    cedula: "",
    telefono: "",
    referencia: "",
  });

  const steps = ["Información Personal", "Detalles del Pago"];

  // Manejar cambios en los campos
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Manejar archivo de cédula
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData((prevData) => ({
      ...prevData,
      cedulaImagen: file,
    }));

    console.log(file)
  };

  // Navegar entre pasos
  const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 0));

  // Enviar formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Datos del formulario:", formData);
    // Aquí puedes enviar los datos al backend
  };

  return (
    <Box sx={{ maxWidth: 600, mx: "auto", mt: 4, p: 2 }}>
      <Typography variant="h5" gutterBottom>
        Formulario de Registro
      </Typography>

      {/* Plan Seleccionado */}
      {selectedPlan && (
        <Box sx={{ mb: 2, p: 2, border: "1px solid #ccc", borderRadius: 2 }}>
          <Typography variant="h6">Plan Seleccionado</Typography>
          <Typography><strong>Nombre:</strong> {selectedPlan.title}</Typography>
          <Typography><strong>Precio:</strong> ${selectedPlan.precio}</Typography>
        </Box>
      )}

      {/* Stepper */}
      <Stepper activeStep={currentStep} alternativeLabel sx={{ mb: 3 }}>
        {steps.map((label, index) => (
          <Step key={index}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <form onSubmit={handleSubmit}>
        {currentStep === 0 && (
          <Box>
            <TextField
              fullWidth
              label="Nombre"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Apellido"
              name="apellido"
              value={formData.apellido}
              onChange={handleChange}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Fecha de Nacimiento"
              name="fechaNacimiento"
              type="date"
              InputLabelProps={{ shrink: true }}
              value={formData.fechaNacimiento}
              onChange={handleChange}
              margin="normal"
              required
            />
            <FormControl fullWidth margin="normal">
              <InputLabel id="genero-label">Género</InputLabel>
              <Select
                labelId="genero-label"
                name="genero"
                value={formData.genero}
                onChange={handleChange}
                required
              >
                <MenuItem value="masculino">Masculino</MenuItem>
                <MenuItem value="femenino">Femenino</MenuItem>
                <MenuItem value="otro">Otro</MenuItem>
              </Select>
            </FormControl>
            <TextField
              fullWidth
              label="Estado"
              name="estado"
              value={formData.estado}
              onChange={handleChange}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Ciudad"
              name="ciudad"
              value={formData.ciudad}
              onChange={handleChange}
              margin="normal"
              required
            />
            <Button
              variant="contained"
              component="label"
              sx={{ mt: 2 }}
            >
              Subir Imagen de Cédula
              <input
                type="file"
                hidden
                accept="image/*"
                onChange={handleFileChange}
                required
              />
            </Button>
          </Box>
        )}

        {currentStep === 1 && (
          <Box>
            <Typography><strong>Precio del Plan:</strong> ${selectedPlan?.precio || "N/A"}</Typography>
            <FormControl fullWidth margin="normal">
              <InputLabel id="banco-label">Banco</InputLabel>
              <Select
                labelId="banco-label"
                name="banco"
                value={formData.banco}
                onChange={handleChange}
                required
              >
                <MenuItem value="banco1">Banco 1</MenuItem>
                <MenuItem value="banco2">Banco 2</MenuItem>
                <MenuItem value="banco3">Banco 3</MenuItem>
              </Select>
            </FormControl>
            <TextField
              fullWidth
              label="Número de Cédula"
              name="cedula"
              value={formData.cedula}
              onChange={handleChange}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Teléfono"
              name="telefono"
              value={formData.telefono}
              onChange={handleChange}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Referencia"
              name="referencia"
              value={formData.referencia}
              onChange={handleChange}
              margin="normal"
              required
            />
          </Box>
        )}

        {/* Botones de Navegación */}
        <Box sx={{ mt: 3, display: "flex", justifyContent: "space-between" }}>
          {currentStep > 0 && (
            <Button variant="outlined" onClick={prevStep}>
              Anterior
            </Button>
          )}
          {currentStep < steps.length - 1 ? (
            <Button variant="contained" onClick={nextStep}>
              Siguiente
            </Button>
          ) : (
            <Button type="submit" variant="contained">
              Enviar
            </Button>
          )}
        </Box>
      </form>
    </Box>
  );
};

export default Formulario;
