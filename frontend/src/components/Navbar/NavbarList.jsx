'use client'
import Link from "next/link";
import SpeedOutlinedIcon from '@mui/icons-material/SpeedOutlined';
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import Groups2OutlinedIcon from '@mui/icons-material/Groups2Outlined';
import NotificationsIcon from '@mui/icons-material/Notifications';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import SearchIcon from '@mui/icons-material/Search';
import { FaBox } from "react-icons/fa";
import { FaTags } from 'react-icons/fa';
import BtnAtivado from "../Geral/Button/BtnAtivado";
import BtnSignOut from "./BtnSignOut";
import DarkModeToggle from "../Geral/Button/DarkModeToggle";
import ActionsHeader from "../Geral/ActionsHeader";
import SavingsOutlinedIcon from '@mui/icons-material/SavingsOutlined';


const iconsNav = [
    <Groups2OutlinedIcon key="Clientes" sx={{ width: 24 }} />,
    <FaTags key="Vendas" sx={{ width: 24 }} />,
    // <FaBox key="Produtos" sx={{ width: 24 }} />,
    <SavingsOutlinedIcon key="Lucros" sx={{ width: 24 }} />,
    <AssignmentOutlinedIcon key="pedidos" sx={{ width: 24 }} />,
    // <ShoppingCartOutlinedIcon key="pedidos" sx={{ width: 24 }} />,
    // <SpeedOutlinedIcon key="Desempenho" sx={{ width: 24 }} />,
];

const NavbarList = () => {
    return (
        <div className="w-44 ml-3 lg:ml-0 flex flex-col justify-center items-center">
            <ul className="w-40 mt-2 lg:mt-6 mb-4">
                <li className="w-40 mb-10 flex items-center mt-1 justify-between">
                    <BtnAtivado title="Home" onClick="/inicio" page="/inicio" size="sm" rounded="xl" padding="xl" />
                    <span>
                        <NotificationsIcon className='text-segundaria-800 w-6 h-6' />
                    </span>
                </li>

                <li className="w-40 mb-10">
                    <div className="w-40 flex items-center rounded-full py-2 relative">
                        <div className="relative w-full">
                            <SearchIcon className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <input type="text" className="w-40 focus:outline-none focus:ring focus:border-gray-700 bg-white dark:bg-primaria-800 rounded-lg text-txt-primaria outline-none pl-10 pr-3 py-2 text-xs" placeholder="O que procura?" />
                        </div>
                    </div>
                </li>
                <h3 className="w-40 text-sm font-normal opacity-80 mb-2">Dia a dia</h3>
                {["Clientes", "Vendas", "Lucros"].map(
                    (text, index) => (
                        <li key={text} className="w-36 flex flex-col justify-center mb-4">
                            <Link className="w-36" href={`/${text.toLowerCase()}`}>
                                <button
                                    className={`flex px-2 py-1 relative group text-neutral-600 hover:text-segundaria-900 items-center group active:bg-gray-200 dark:focus:bg-primaria-800 rounded-full transition duration-300 ease-in-out`}
                                >
                                    <span
                                        className={`w-6 flex justify-center text-neutral-600 group-hover:text-segundaria-900 mr-2 transition duration-300 ease-in-out`}
                                    >
                                        {iconsNav[index]}
                                    </span>
                                    <span className={`w-24 text-start text-sm font-medium text-neutral-600 group-hover:text-segundaria-900 dark:text-white transition duration-300 ease-in-out`}> {text} </span>
                                </button>
                            </Link>
                        </li>
                    )
                )}
            </ul>
            <hr className="w-full" />
            <ul className="w-full mt-4 lg:mt-6 mb-5">
                <li className="flex flex-col justify-center mb-1">
                    <ActionsHeader />
                </li>
                <li className="flex flex-col justify-center mb-1">
                    <DarkModeToggle />
                </li>
                <li className="flex flex-col justify-center mb-1 ml-1">
                    <BtnSignOut />
                </li>
            </ul>
        </div>
    );
};

export default NavbarList;