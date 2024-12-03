'use client'
import { SwipeableDrawer } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import FormEditarClientes from './FormEditarClientes';
import { ThemeProvider, createTheme, useTheme } from '@mui/material/styles';

const createMyTheme = (mode) => createTheme({
  palette: {
    mode,
    background: {
      paper: mode === 'dark' ? '#23262F' : '#ffffff', 
    },
  },
});

const ModalEditarClientes = ({ isOpen, onToggle}) => {
  const theme = useTheme();
  const customTheme = createMyTheme(theme.palette.mode);

  return (
    <ThemeProvider theme={customTheme}>
      <div>
        <SwipeableDrawer
          anchor="right"
          open={isOpen}
          onClose={() => onToggle(false)}
          onOpen={() => onToggle(true)}
          sx={{ 
            width: ['100%', 'md:300px'],
            '& .MuiDrawer-paper': {
              backgroundColor: 'background.paper', 
              backgroundImage: 'none',
            },
          }}
        >
          <div className="mx-4">
            <div className="w-full min-w-[320px] lg:w-[955px] mx-auto px-2 mt-11">
              <div className="flex justify-between mb-2">
                <h1 className="text-base lg:text-lg font-semibold">Editar Cliente</h1>
                <button type="button" onClick={() => onToggle(false)}><CloseIcon /></button>
              </div>
              <hr className="w-full"/>
            </div>
            <div className="rounded-xl w-full min-w-[320px] lg:w-[955px] py-4 px-4">
              <FormEditarClientes />
            </div>
          </div>
        </SwipeableDrawer>
      </div>
    </ThemeProvider>
  );
}
export default ModalEditarClientes;