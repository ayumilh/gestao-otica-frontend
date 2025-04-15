'use client'
import { useState } from 'react';
import Drawer from '@mui/material/Drawer';
import NavbarList from './NavbarList';
import { useTheme, styled } from '@mui/material/styles';

export default function NavbarContent() {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  
  const StyledDrawer = styled(Drawer)(({ theme }) => ({
    width: '190px',
    flexShrink: 0,
    '& .MuiDrawer-paper': {
      width: '190px',
      boxSizing: 'border-box',
      backgroundColor: theme.palette.mode === 'dark' ? '#23262F' : '#ffffff',
      color: theme.palette.text.primary,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'between',
      border: 'none',
      borderRight: theme.palette.mode === 'dark' ? '1px solid #393C45' : '1px solid #E5E7EB',
      boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
      borderTopRightRadius: '20px',
      borderBottomRightRadius: '20px',
    },
  }));

  return (
    <div className='hidden lg:flex'>
      <StyledDrawer
        variant="permanent"
        anchor="left"
        open={open}
        onClose={() => setOpen(false)}
        ModalProps={{
          keepMounted: true,
        }}
      >
        <NavbarList />
      </StyledDrawer>
    </div>
  );
}