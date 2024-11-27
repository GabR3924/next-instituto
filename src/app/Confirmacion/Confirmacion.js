import { useRouter } from "next/navigation"; // Hook de navegación de Next.js
import Image from "next/image";
import { FaWhatsapp } from "react-icons/fa";
import { BiLogoGmail } from "react-icons/bi";
import { FaPhoneAlt } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { useEffect, useRef } from "react";
import { jsPDF } from "jspdf";
import "jspdf-autotable";

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

const Confirmation = () => {
  const router = useRouter();
  const tableRef = useRef();

  const plan = "Accidentes Personales"; // Puedes reemplazar estos valores por los reales
  const cliente = "Juan Pérez";
  const pago = "500 Bs"; // Puedes reemplazar estos valores por los reales

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

      {/* Tabla moderna con Material-UI */}
      <TableContainer component={Paper} className={styles.tableContainer}>
        <Table aria-label="confirmation table">
          <TableHead>
            <TableRow>
              <TableCell>
                <strong>Plan</strong>
              </TableCell>
              <TableCell>
                <strong>Cliente</strong>
              </TableCell>
              <TableCell>
                <strong>Pago</strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>{plan}</TableCell>
              <TableCell>{cliente}</TableCell>
              <TableCell>{pago}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      <Typography
        variant="body1"
        align="center"
        paragraph
        className={styles.paragraph}
      >
        En las próximas 24 horas recibirá su póliza por correo.
      </Typography>

      {/* Información de contacto */}
      <div className={styles.contacto}>
        <div className={styles.contactItem}>
          <FaWhatsapp size={20} />
          <Typography variant="body2" className={styles.contactInfo}>
            0412-289.38.86
          </Typography>
        </div>
        <div className={styles.contactItem}>
          <BiLogoGmail size={20} />
          <Typography variant="body2" className={styles.contactInfo}>
            cisscavirtual@vivirseguros.web.ve
          </Typography>
        </div>
        <div className={styles.contactItem}>
          <FaPhoneAlt size={20} />
          <Typography variant="body2" className={styles.contactInfo}>
            0412-289.38.86
          </Typography>
        </div>
      </div>

      <div className={styles.location}>
        <FaLocationDot size={20} />
        <Typography variant="body2" className={styles.locationText}>
          Av. Venezuela, Torre Vivir Seguros, Urb. El Rosal, Chacao, Venezuela
        </Typography>
      </div>

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
