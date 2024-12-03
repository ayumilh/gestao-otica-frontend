'use client'
import Drawer from '@mui/material/Drawer';
import NavbarList from './NavbarList';
import { ThemeProvider, createTheme, useTheme } from '@mui/material/styles';

const createMyTheme = (mode) => createTheme({
  palette: {
    mode,
    background: {
      paper: mode === 'dark' ? '#23262F' : '#F6F6FB',
    },
    width: {
      full: 'w-full',
    },
  },
});

export default function NavbarContent() {
  const theme = useTheme();
  const customTheme = createMyTheme(theme.palette.mode);

  return (
    <ThemeProvider theme={customTheme}>
      <div className='hidden lg:flex'>
        <Drawer
          sx={{
            width: '190px',
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: '190px',
              boxSizing: 'border-box',
              backgroundColor: 'background.paper',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'beetween',
              border: 'none',
              boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
              borderTopRightRadius: '20px',
              borderBottomRightRadius: '20px',
            },
          }}
          variant="permanent"
          anchor="left"
        >
          <NavbarList />
        </Drawer>
      </div>
    </ThemeProvider>

  );
}