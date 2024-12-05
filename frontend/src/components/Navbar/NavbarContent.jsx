'use client'
import Drawer from '@mui/material/Drawer';
import NavbarList from './NavbarList';
import { useTheme, styled } from '@mui/material/styles';

export default function NavbarContent() {
  const theme = useTheme();
  
  const StyledDrawer = styled(Drawer)(({ theme }) => ({
    width: '190px',
    flexShrink: 0,
    '& .MuiDrawer-paper': {
      width: '190px',
      boxSizing: 'border-box',
      backgroundColor: theme.palette.background.paper,
      color: theme.palette.text.primary,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'between',
      border: 'none',
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
      >
        <NavbarList />
      </StyledDrawer>
    </div>
  );
}