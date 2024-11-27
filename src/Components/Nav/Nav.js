'use client'

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
    <AppBar position="static">
      <Toolbar>
        {/* Logo */}
        <div style={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
          <img src="/figlogo.png" alt="Logo" style={{ width: 150 }} /> {/* Ruta ajustada */}
        </div>

        {/* Menú de navegación para dispositivos normales */}
        {!isMobile && (
          <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
            <Link href="/">
              <Button color="inherit">Inicio</Button>
            </Link>
            <Link href="/#info">
              <Button color="inherit">Servicios</Button>
            </Link>
            <Link href="/#plans">
              <Button color="inherit">Nosotros</Button>
            </Link>

            {/* Botón de contacto */}
            <Button variant="contained" color="primary">Contactanos</Button>
          </div>
        )}

        {/* Menú para dispositivos móviles */}
        {isMobile && (
          <IconButton color="inherit" onClick={handleMenuOpen}>
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
