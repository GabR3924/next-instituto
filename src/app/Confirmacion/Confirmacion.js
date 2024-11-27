import { useRouter } from "next/navigation"; // Hook de navegación de Next.js
import Image from "next/image";
import { FaWhatsapp } from "react-icons/fa";
import { BiLogoGmail } from "react-icons/bi";
import { FaPhoneAlt } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { useContext } from "react";
import { FormDataContext } from "../../Context/FormDataContext"; // Asumiendo que tienes un contexto para formData
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from "@mui/material";
import styles from "./Confirmcion.module.css"; // Usa un módulo CSS para estilos
import { useFormData } from "../../Context/FormDataContext";
const Confirmation = () => {
  const router = useRouter();
  
  // Accedemos al estado global de formData (suponiendo que usas React Context o un estado global)
  const { formData } = useFormData(); // Aquí accedes al contexto

  // Extracción de valores de formData
  const { nombre, apellido, fechaNacimiento, direccion, estado, correo, cedulaImagen, banco, cedula, telefono, referencia, telefonoCodigo } = formData;

  return (
    <div className={styles.confirmation}>
      <Typography
        variant="h5"
        align="center"
        gutterBottom
        className={styles.boldText}
      >
        ¡Felicidades! Ha finalizado exitosamente la carga de información y pago
        de su póliza de Accidentes Personales.
      </Typography>

      {/* Tabla de detalles del formulario */}
      <Typography variant="h6" align="center" gutterBottom>
        Información del Formulario
      </Typography>
      <TableContainer component={Paper} className={styles.tableContainer}>
        <Table aria-label="Form Data Details">
          <TableHead>
            <TableRow>
              <TableCell><strong>Campo</strong></TableCell>
              <TableCell><strong>Valor</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>Nombre</TableCell>
              <TableCell>{nombre}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Apellido</TableCell>
              <TableCell>{apellido}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Fecha de Nacimiento</TableCell>
              <TableCell>{fechaNacimiento}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Dirección</TableCell>
              <TableCell>{direccion}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Estado</TableCell>
              <TableCell>{estado}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Correo</TableCell>
              <TableCell>{correo}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Cédula Imagen</TableCell>
              <TableCell>{cedulaImagen ? "Imagen subida" : "No disponible"}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Banco</TableCell>
              <TableCell>{banco}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Cédula</TableCell>
              <TableCell>{cedula}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Teléfono</TableCell>
              <TableCell>{telefonoCodigo}{telefono}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Referencia</TableCell>
              <TableCell>{referencia}</TableCell>
            </TableRow>
            
          </TableBody>
        </Table>
      </TableContainer>

      {/* Tabla de detalles del pago (si se necesita) */}
      <Typography variant="h6" align="center" gutterBottom>
        Detalles de Pago
      </Typography>
      <TableContainer component={Paper} className={styles.tableContainer}>
        <Table aria-label="Payment Details">
          <TableHead>
            <TableRow>
              <TableCell><strong>Plan</strong></TableCell>
              <TableCell><strong>Cliente</strong></TableCell>
              {/* <TableCell><strong>Pago</strong></TableCell> */}
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>Accidentes Personales</TableCell>
              <TableCell>{nombre} {apellido}</TableCell>
              {/* <TableCell>500 Bs</TableCell> */}
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      {/* Información de contacto */}
      <Typography variant="h6" align="center" gutterBottom>
        Información de Contacto
      </Typography>
      <TableContainer component={Paper} className={styles.tableContainer}>
        <Table aria-label="Contact Info">
          <TableHead>
            <TableRow>
              <TableCell><strong>Medio</strong></TableCell>
              <TableCell><strong>Contacto</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell><FaWhatsapp size={20} /> WhatsApp</TableCell>
              <TableCell>0412-289.38.86</TableCell>
            </TableRow>
            <TableRow>
              <TableCell><BiLogoGmail size={20} /> Correo Electrónico</TableCell>
              <TableCell>cisscavirtual@vivirseguros.web.ve</TableCell>
            </TableRow>
            <TableRow>
              <TableCell><FaPhoneAlt size={20} /> Teléfono</TableCell>
              <TableCell>0412-289.38.86</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      {/* Tabla de ubicación */}
      <Typography variant="h6" align="center" gutterBottom>
        Ubicación
      </Typography>
      <TableContainer component={Paper} className={styles.tableContainer}>
        <Table aria-label="Location Info">
          <TableHead>
            <TableRow>
              <TableCell><strong>Dirección</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>Av. Venezuela, Torre Vivir Seguros, Urb. El Rosal, Chacao, Venezuela</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      <div className={styles.logo}>
        <Image src="/logo1.png" alt="Logo" width={200} height={100} />
      </div>

      <Typography
        variant="body1"
        align="center"
        paragraph
        className={styles.paragraph}
      >
        Gracias por su confianza.
      </Typography>

      {/* Botón para regresar al inicio */}
      <div className={styles.buttons}>
        <button
          type="button"
          onClick={() => router.push("/")}
          className={styles.button}
        >
          Ir al inicio
        </button>
      </div>
    </div>
  );
};

export default Confirmation;
