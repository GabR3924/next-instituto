'use client';

import React, { useState } from 'react';
import { AppBar, Toolbar, Button, IconButton, Menu, MenuItem, useMediaQuery } from '@mui/material';
import { FaInstagram, FaFacebookF } from 'react-icons/fa';
import { MdMenu } from 'react-icons/md';
import Link from 'next/link';

const Nav = () => {
  const [anchorEl, setAnchorEl] = useState(null); // Para el menú desplegable en móviles

  // Usamos un hook para determinar el tamaño de la pantalla
  const isMobile = useMediaQuery('(max-width: 600px)'); // Este breakpoint es para pantallas pequeñas (móviles)

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: 'white' }}> {/* Cambiamos el color de fondo a blanco */}
      <Toolbar>
        {/* Logo */}
        <div style={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
          <img src="/figlogo.png" alt="Logo" style={{ width: 150 }} /> {/* Ruta ajustada */}
        </div>

        {/* Menú de navegación para dispositivos normales */}
        {!isMobile && (
          <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
            <Link href="/">
              <Button sx={{ color: '#444' }}> {/* Color gris oscuro para los enlaces */}
                Inicio
              </Button>
            </Link>
            <Link href="/Formulario">
              <Button sx={{ color: '#444' }}> {/* Color gris oscuro para los enlaces */}
                Servicios
              </Button>
            </Link>
            <Link href="/#plans">
              <Button sx={{ color: '#444' }}> {/* Color gris oscuro para los enlaces */}
                Nosotros
              </Button>
            </Link>

            {/* Botón de contacto con color naranja */}
            <Button variant="contained" sx={{ backgroundColor: '#ff7f00', color: 'white' }}> {/* Naranja */}
              Contactanos
            </Button>
          </div>
        )}

        {/* Menú para dispositivos móviles */}
        {isMobile && (
          <IconButton color="primary" onClick={handleMenuOpen}> {/* Icono de menú con color primario */}
            <MdMenu />
          </IconButton>
        )}

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={handleMenuClose}><Link href="/">Inicio</Link></MenuItem>
          <MenuItem onClick={handleMenuClose}><Link href="/#info">Servicios</Link></MenuItem>
          <MenuItem onClick={handleMenuClose}><Link href="/#plans">Nosotros</Link></MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Nav;
