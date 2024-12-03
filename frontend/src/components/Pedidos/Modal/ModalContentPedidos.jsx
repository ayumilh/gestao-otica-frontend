'use client'
import { useState } from "react";
import { SwipeableDrawer } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import BtnAtivado from '@/components/Geral/Button/BtnAtivado'
import { FormAddPedidos } from "./FormAddPedidos";


export default function ModalContentPedidos() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer = (open) => (event) => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setIsOpen(open);
  };

  return (
    <div>
      <BtnAtivado title='Criar pedido' onClick={toggleDrawer(true)} size="sm" width="full"/>
      <SwipeableDrawer
        anchor="right"
        open={isOpen}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
        sx={{width: '300px'}}
      >
        <div className="px-4 lg:px-7">
          <div className="w-[300px] md:w-[720px] lg:w-[920px] xl:w-[980px] mx-auto mt-11">
            <div className="flex justify-between">
              <h1 className="text-base lg:text-lg font-semibold">Criar pedidos</h1>
              <button type="button" onClick={toggleDrawer(false)}><CloseIcon /></button>
            </div>
            <hr className="w-full"/>
          </div>
          <form className="rounded-xl w-[300px] md:w-[720px] lg:w-[920px] xl:w-[980px] md:p-6 py-5 px-4 lg:px-7">
            <FormAddPedidos />
          </form>
        </div>
      </SwipeableDrawer>
    </div>
  );
}