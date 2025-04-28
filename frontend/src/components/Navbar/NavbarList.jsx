'use client'
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import Groups2OutlinedIcon from '@mui/icons-material/Groups2Outlined';
import SearchIcon from '@mui/icons-material/Search';
import { FaTags } from 'react-icons/fa';
import BtnAtivado from "../Ui/Button/BtnAtivado";
import BtnSignOut from "./BtnSignOut";
import DarkModeToggle from "../Ui/Button/DarkModeToggle";
import ActionsHeader from "../Ui/ActionsHeader";
import SavingsOutlinedIcon from '@mui/icons-material/SavingsOutlined';
import NoteAddIcon from '@mui/icons-material/NoteAdd';



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
    const pathname = usePathname();
    const router = useRouter();

    const handleClick = () => {
        router.push("/os");
    };

    return (
        <div className="w-44 lg:ml-0 flex flex-col justify-center items-center">
            <ul className="w-40 mt-2 lg:mt-6 mb-4">
                <li className="w-40 mb-10 flex items-center mt-1 justify-between">
                    <BtnAtivado title="Home" onClick="/inicio" page="/inicio" size="sm" rounded="xl" padding="xl" />
                    <button onClick={handleClick} className="ml-2 flex justify-center items-center ">
                        <NoteAddIcon fontSize="large" className="text-orange-400 hover:text-orange-500 dark:text-orange-300 transition ease-in-out duration-700" /> 
                    </button>
                </li>

                {/* <li className="w-40 mb-10">
                    <div className="w-40 flex items-center rounded-full py-2 relative">
                        <div className="relative w-full">
                            <SearchIcon fontSize="small" className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <input type="text" className="w-40 focus:outline-none focus:ring focus:border-gray-700 border border-gray-100 bg-white dark:bg-primaria-800 rounded-lg text-txt-primaria outline-none pl-10 pr-2 py-2 text-xs" placeholder="O que procura?" />
                        </div>
                    </div>
                </li> */}
                {/* <li className="w-40 mb-10">
                    <div className="w-40 flex items-center rounded-full py-2 relative">
                        <BtnAtivado title='Criar O.S' onClick="/clientes" page="/os" size="sm" rounded="lg" />
                    </div>
                </li> */}
                <h3 className="w-40 text-sm font-normal opacity-80 mb-2">Dia a dia</h3>
                {["Clientes", "Vendas", "Lucros"].map((text, index) => {
                    const href = `/${text.toLowerCase()}`;
                    const isActive = pathname === href;

                    return (
                        <li key={text} className="w-36 flex flex-col justify-center mb-4">
                            <Link className="w-36" href={href}>
                                <button
                                    className={`flex px-2 py-1 relative group items-center rounded-full transition duration-300 ease-in-out
                                    ${isActive ? "text-orange-500 font-medium" : "text-neutral-600 hover:text-segundaria-900 dark:text-white"}
                                    `}
                                >
                                    <span
                                        className={`w-6 flex justify-center mr-2 transition duration-300 ease-in-out
                                        ${isActive ? "text-orange-500" : "text-neutral-600 group-hover:text-segundaria-900"}`}
                                    >
                                        {iconsNav[index]}
                                    </span>
                                    <span
                                        className={`w-24 text-start text-sm transition duration-300 ease-in-out
                                        ${isActive ? "text-orange-500" : "text-neutral-600 group-hover:text-segundaria-900 dark:text-white"}`}
                                    >
                                        {text}
                                    </span>
                                </button>
                            </Link>
                        </li>
                    );
                })}
            </ul>
            <hr className="w-full" />
            <ul className="w-full mt-4 lg:mt-6 mb-5">
                {/* <li className="flex flex-col justify-center mb-1">
                    <ActionsHeader />
                </li> */}
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