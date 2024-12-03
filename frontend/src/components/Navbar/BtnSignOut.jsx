import { useContext } from "react";
import {AuthContext} from '@/contexts/AuthContext' 
import LogoutIcon from '@mui/icons-material/Logout';

const BtnSignOut = () => {
  const { toggleModal } = useContext(AuthContext)
  return (
    <button 
      onClick={toggleModal}
      className="flex h-9 px-2 py-1 relative group items-center group active:bg-gray-200 dark:hover:bg-primaria-800 transition duration-300 ease-in-out rounded-full"
    >
      <span className="w-6 flex justify-center mr-2"><LogoutIcon className="text-neutral-600 group-hover:text-segundaria-900 transition duration-300 ease-in-out" sx={{ width: 24 }} /></span>
      <span className="w-24 text-start text-sm font-medium text-neutral-600 group-hover:text-segundaria-900 transition duration-300 ease-in-out">Sair</span>
    </button>
  )
}

export default BtnSignOut