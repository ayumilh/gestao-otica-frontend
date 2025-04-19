'use client'
import { useContext, useState } from "react";
import { styled, useTheme } from '@mui/material/styles';
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { AuthContext } from "../../../contexts/AuthContext";
import NavbarList from "../NavbarList";

export default function NavbarMobile() {
  const { darkMode } = useContext(AuthContext)
  const theme = useTheme();
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => setOpen(true);
  const handleDrawerClose = () => setOpen(false);

  const StyledDrawer = styled(Drawer)(({ theme }) => ({
    '& .MuiDrawer-paper': {
      width: '190px',
      backgroundColor: theme.palette.mode === 'dark' ? '#23262F' : '#ffffff',
      boxSizing: "border-box",
      border: 'none',
      borderRight: theme.palette.mode === 'dark' ? '1px solid #393C45' : '1px solid #E5E7EB',
      borderTopRightRadius: '20px',
      borderBottomRightRadius: '20px',
    },
  }));

  const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  }));

  return (
    <div className="lg:hidden">
      <IconButton
        color="inherit"
        aria-label="open drawer"
        onClick={handleDrawerOpen}
        edge="start"
        sx={{ mr: 2 }}
      >
        <MenuRoundedIcon sx={{ fontSize: '28px' }} />
      </IconButton>

      <StyledDrawer
        variant="temporary"
        anchor="left"
        open={open}
        onClose={handleDrawerClose} // Fecha ao clicar fora
        ModalProps={{ keepMounted: true }} // performance em mobile
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <NavbarList />
      </StyledDrawer>
    </div>
  );
}
