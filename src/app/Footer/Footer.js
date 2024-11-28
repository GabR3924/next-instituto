'use client';
import { Box, Typography, Link as MuiLink, IconButton } from "@mui/material";
import { BsFacebook, BsTwitter, BsInstagram } from "react-icons/bs";
import { FaTiktok } from "react-icons/fa";
import Image from 'next/image';

const Footer = () => {
  const links = [
    {
      title: "Contacto",
      data: ["0412-289.38.86 / 0212-212.48.00"],
    },
    {
      title: "Productos",
      data: ["Automovil", "Personas y Salud", "Patrimoniales y Fianzas"],
    },
  ];

  const socialLink = [
    <BsFacebook />,
    <BsTwitter />,
    <BsInstagram />,
    <FaTiktok />,
  ];

  return (
    <Box component="footer" sx={{ backgroundColor: "#f1f1f1", py: 4 }}>
      {/* Sección superior con logo y enlaces sociales */}
      <Box display="flex" flexDirection="column" alignItems="center" sx={{ mb: 4 }}>
        {/* <Image src="/figlogo" alt="logo" width={100} height={100} /> */}
        <MuiLink href="https://backoffice-vivirseguros.vercel.app" color="inherit" sx={{ textDecoration: "none", mt: 2 }}>
          Vivir Seguros
        </MuiLink>
        <Box display="flex" justifyContent="center" mt={2}>
          {socialLink.map((link, index) => (
            <IconButton key={index} sx={{ margin: "0 8px" }}>
              {link}
            </IconButton>
          ))}
        </Box>
        {/* Enlace a WhatsApp */}
        <MuiLink 
          href="https://wa.me/04122893886" 
          target="_blank" 
          color="inherit" 
          sx={{ textDecoration: "none", mt: 2 }}
        >
          WhatsApp
        </MuiLink>
      </Box>

      {/* Enlaces adicionales */}
      <Box sx={{ mb: 4 }} textAlign="center">
        {links.map(({ title, data }, index) => (
          <Box key={index} mb={2}>
            <Typography variant="h6" gutterBottom>
              {title}
            </Typography>
            <Box>
              {data.map((link, index2) => (
                <Typography key={index2} variant="body2">
                  {link}
                </Typography>
              ))}
            </Box>
          </Box>
        ))}
      </Box>

      {/* Sección inferior */}
      <Box textAlign="center">
        <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
          &copy; Copyright 2024
        </Typography>
        <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
          GoCast Group 2024
        </Typography>
        <Typography variant="body2" color="textSecondary">
          &Designe; By{" "}
          <MuiLink href="https://gocastgroup.com" target="_blank" color="inherit">
            Grupo GoCast
          </MuiLink>{" "}
          Soluciones, C.A 2024
        </Typography>
      </Box>
    </Box>
  );
};

export default Footer;
