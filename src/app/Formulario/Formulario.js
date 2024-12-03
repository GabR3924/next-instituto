"use client";
import { useRouter } from "next/navigation"; // Hook de navegación de Next.js
import React, { useState } from "react";
import {
  TextField,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Typography,
  Stepper,
  Step,
  StepLabel,
  Box,
} from "@mui/material";
import { usePlanContext } from "@/Context/PlanContex"; // Contexto para obtener el plan seleccionado
import axios from "axios";
import { useFormData } from "@/Context/FormDataContext";
import CircularProgress from "@mui/material/CircularProgress";

const Formulario = () => {
  const router = useRouter(); // Instancia del hook useRouter

  const { selectedPlan } = usePlanContext(); // Obtener el plan seleccionado del contexto
  const [loading, setLoading] = useState(false); // Definimos el estado de carga (loading)
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const { formData, setFormData } = useFormData();
  const steps = ["Datos Personales", "Detalles del Pago"];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  // Manejar archivo de cédula
  const handleFileChange = (e) => {
    const file = e.target.files[0];

    // Mostrar en consola el archivo seleccionado
    console.log("Archivo de cédula seleccionado:", file);

    setFormData((prevData) => ({
      ...prevData,
      cedulaImagen: file,
    }));
  };

  // Navegar entre pasos
  const nextStep = () =>
    setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 0));

  // Enviar formulario
  const handleSubmit = async (e) => {
    e.preventDefault(); // Evita el comportamiento por defecto del formulario
    console.log("Datos del formulario:", formData);

    // Establece el estado de envío en true
    setIsSubmitting(true);

    // Llamar a la función de pago y esperar su resultado
    const pagoExitoso = await handleGuardarPago();

    if (pagoExitoso) {
      // Si el pago fue exitoso, prepara los datos para enviar
      console.log("Enviando datos del formulario...");

      // Crear instancia de FormData
      const formDataToSend = new FormData();
      formDataToSend.append("cedula_propietario", formData.cedula);
      formDataToSend.append("nombre_propietario", formData.nombre);
      formDataToSend.append("apellido_propietario", formData.apellido);
      formDataToSend.append("fecha_nacimiento", formData.fechaNacimiento);
      formDataToSend.append(
        "telefono",
        `${formData.telefonoCodigo}${formData.telefono}`
      );
      formDataToSend.append("correo", formData.correo);
      formDataToSend.append("estado", formData.estado);
      formDataToSend.append("direccion", formData.direccion);
      formDataToSend.append("plan", selectedPlan.title);
      formDataToSend.append("paymentData_referencia", formData.referencia);
      formDataToSend.append("paymentData_monto", selectedPlan.bolivares);
      formDataToSend.append("paymentData_banco", formData.banco);
      // Agregar archivo solo si existe
      if (formData.cedulaImagen) {
        formDataToSend.append("imagen_cedula", formData.cedulaImagen);
      }

      try {
        // Enviar datos al backend
        const response = await axios.post(
          "https://rcv.gocastgroup.com:2053/vivirseguros/universitario",
          formDataToSend,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        console.log("Datos enviados con éxito:", response.data);

        // Redirigir a la página de confirmación
        router.push("/Confirmacion"); // Redirige a la página de confirmación
      } catch (error) {
        alert("Error al enviar los datos, intente más tarde");
        console.error("Error al enviar los datos:", error);
      }
    } else {
      // Si el pago falló, manejar error
      console.log("No se completó el pago, el formulario no será enviado.");
    }

    // Establece el estado de envío en false después de que se haya completado el proceso
    setIsSubmitting(false);
  };

  // Modificación de handleGuardarPago para que devuelva un valor booleano indicando éxito o fracaso
  const handleGuardarPago = async () => {
    setLoading(true); // Inicia el ícono de carga
    const { banco, telefono, referencia, telefonoCodigo } = formData;
    const monto = selectedPlan.bolivares;
    const telefonoCompleto = `58${telefonoCodigo}${telefono}`; // Concatenar el código con el número
    console.log(monto, banco, telefonoCompleto, referencia);
    // Validación de campos
    if (!monto || !banco || !telefonoCompleto || !referencia) {
      setLoading(false); // Detiene el ícono de carga
      alert("Por favor, completa todos los campos antes de continuar."); // Alerta para campos incompletos
      return false; // Detiene el proceso si falta algún dato
    }

    try {
      const response = await axios.post(
        "https://apidev.gocastgroup.com/api/bnc/p2p.php",
        {
          montop2p: monto,
          banco: banco,
          telefono: telefonoCompleto,
          Reference: referencia,
          clienteNombre: "VivirSeguros",
        }
      );

      setLoading(false); // Detiene el ícono de carga
      console.log("respuesta completa", response.data);
      console.log("res api message", response.data.message);

      if (response && response.data.status === "success") {
        // handlePaymentData({
        //   fecha: new Date(),
        //   referencia: response.data.reference || referencia,
        //   monto: monto,
        //   banco: selectedBanco,
        // });

        // setPagoMovilResponse({
        //   message: response.data.message || "Transacción completada con éxito.",
        //   additionalMessage: "Haga clic en 'Enviar' para completar el proceso.",
        // });
        console.log("pago completado", response.data);
        return true; // Indica que el pago fue exitoso
      } else {
        console.error(
          "Error en la transacción:",
          response.data.message || "Error desconocido."
        );
        return false; // El pago falló
      }
    } catch (error) {
      setLoading(false); // Detiene el ícono de carga
      // setPagoMovilResponse({
      //   message: "Error en tu transacción",
      //   additionalMessage:
      //     error.response?.data?.message || "No se pudo completar el pago",
      //   reference: "N/A",
      // });
      console.error("Error al hacer el POST a la API:", error);
      return false; // El pago falló
    }
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
          <Typography>
            <strong>Nombre:</strong> {selectedPlan.title}
          </Typography>
          <Typography>
            <strong>Precio:</strong> ${selectedPlan.precio}
          </Typography>
          <Typography>
            <strong>Precio Bolivares:</strong> {selectedPlan.bolivares}Bs
          </Typography>
          <Typography>
            <strong>Datos de Pago</strong>
          </Typography>
          <Typography>BNC - 0191</Typography>
          <Typography>04242512455</Typography>
          <Typography>J-300673740</Typography>
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
              <InputLabel id="estado-label">Estado</InputLabel>
              <Select
                labelId="estado-label"
                name="estado"
                value={formData.estado}
                onChange={handleChange}
                required
              >
                <MenuItem value="Amazonas">Amazonas</MenuItem>
                <MenuItem value="Anzoátegui">Anzoátegui</MenuItem>
                <MenuItem value="Apure">Apure</MenuItem>
                <MenuItem value="Aragua">Aragua</MenuItem>
                <MenuItem value="Barinas">Barinas</MenuItem>
                <MenuItem value="Bolívar">Bolívar</MenuItem>
                <MenuItem value="Carabobo">Carabobo</MenuItem>
                <MenuItem value="Cojedes">Cojedes</MenuItem>
                <MenuItem value="Delta Amacuro">Delta Amacuro</MenuItem>
                <MenuItem value="Distrito Capital">Distrito Capital</MenuItem>
                <MenuItem value="Falcón">Falcón</MenuItem>
                <MenuItem value="Guárico">Guárico</MenuItem>
                <MenuItem value="La Guaira">La Guaira</MenuItem>
                <MenuItem value="Lara">Lara</MenuItem>
                <MenuItem value="Miranda">Miranda</MenuItem>
                <MenuItem value="Monagas">Monagas</MenuItem>
                <MenuItem value="Mérida">Mérida</MenuItem>
                <MenuItem value="Nueva Esparta">Nueva Esparta</MenuItem>
                <MenuItem value="Portuguesa">Portuguesa</MenuItem>
                <MenuItem value="Sucre">Sucre</MenuItem>
                <MenuItem value="Trujillo">Trujillo</MenuItem>
                <MenuItem value="Táchira">Táchira</MenuItem>
                <MenuItem value="Yaracuy">Yaracuy</MenuItem>
                <MenuItem value="Zulia">Zulia</MenuItem>
              </Select>
            </FormControl>

            <TextField
              fullWidth
              label="Direccion"
              name="direccion"
              value={formData.direccion}
              onChange={handleChange}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Correo"
              name="correo"
              value={formData.correo}
              onChange={handleChange}
              margin="normal"
              required
            />
            <Button variant="contained" component="label" sx={{ mt: 2 }}>
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
            <Typography>
              <strong>Precio del Plan:</strong> $
              {selectedPlan?.bolivares || "N/A"}
            </Typography>
            <FormControl fullWidth margin="normal">
              <InputLabel id="banco-label">Banco</InputLabel>
              <Select
                labelId="banco-label"
                name="banco"
                value={formData.banco}
                onChange={handleChange}
                required
              >
                <MenuItem value="0102">Banco de Venezuela</MenuItem>
                <MenuItem value="0105">Banco Mercantil</MenuItem>
                <MenuItem value="0104">Banco Venezolano de Crédito</MenuItem>
                <MenuItem value="0108">BBVA Banco Provincial</MenuItem>
                <MenuItem value="0114">BanCaribe</MenuItem>
                <MenuItem value="0115">Banco Exterior</MenuItem>
                <MenuItem value="0128">Banco Caroní</MenuItem>
                <MenuItem value="0134">Banesco</MenuItem>
                <MenuItem value="0137">Banco Sofitasa</MenuItem>
                <MenuItem value="0138">Banco Plaza</MenuItem>
                <MenuItem value="0146">BanGente</MenuItem>
                <MenuItem value="0151">Banco Fondo Común (BFC)</MenuItem>
                <MenuItem value="0156">100% Banco</MenuItem>
                <MenuItem value="0157">Del Sur</MenuItem>
                <MenuItem value="0163">Banco del Tesoro</MenuItem>
                <MenuItem value="0175">
                  Banco Digital para los Trabajadores
                </MenuItem>
                <MenuItem value="0166">Banco Agrícola de Venezuela</MenuItem>
                <MenuItem value="0168">BanCrecer, Banco de Desarrollo</MenuItem>
                <MenuItem value="0169">
                  Mi Banco, Banco Microfinanciero
                </MenuItem>
                <MenuItem value="0171">Banco Activo</MenuItem>
                <MenuItem value="0172">Bancamiga Banco Universal</MenuItem>
                <MenuItem value="0174">BanPlus, Banco Comercial</MenuItem>
                <MenuItem value="0177">Banco de las Fuerzas Armadas</MenuItem>
                <MenuItem value="0191">
                  Banco Nacional de Crédito, C.A. Banco Universal
                </MenuItem>
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
            {/* Campo de Teléfono */}
            <Box display="flex" alignItems="center">
              {/* Select para el código de área (por ejemplo, "2" */}
              <FormControl margin="normal">
                <Select
                  name="telefonoCodigo"
                  value={formData.telefonoCodigo}
                  onChange={handleChange}
                  required
                >
                  <MenuItem value="412">412</MenuItem>
                  <MenuItem value="414">414</MenuItem>
                  <MenuItem value="424">424</MenuItem>
                  <MenuItem value="416">416</MenuItem>
                  <MenuItem value="426">426</MenuItem>
                </Select>
              </FormControl>

              {/* Input para el número de teléfono */}
              <TextField
                label="Número de Teléfono"
                name="telefono"
                value={formData.telefono}
                onChange={handleChange}
                margin="normal"
                required
              />
            </Box>
            <TextField
              fullWidth
              label="Monto"
              name="referencia"
              value={selectedPlan.bolivares}
              margin="normal"
              aria-readonly
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
            <Button
              type="submit"
              variant="contained"
              disabled={isSubmitting}
              startIcon={
                isSubmitting ? (
                  <CircularProgress size={24} color="inherit" />
                ) : null
              }
            >
              {isSubmitting ? "Enviando..." : "Enviar"}
            </Button>
          )}
        </Box>
      </form>
    </Box>
  );
};

export default Formulario;
