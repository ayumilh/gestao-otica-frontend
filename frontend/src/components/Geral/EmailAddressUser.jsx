'use client'
import { useContext, useRef, useEffect } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import SettingsIcon from "@mui/icons-material/Settings";
import LinkIcon from '@mui/icons-material/Link';

export const EmailAddressUser = ({ menuOpen, toggleMenu }) => {
    const dropdownRef = useRef(null);
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                toggleMenu;
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        }
    }, [dropdownRef, toggleMenu]);

    return (
        <>
            <span
                className="font-medium w-[92px] overflow-hidden"
                style={{ textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
            >
                user@gmail.com
            </span>
            <div className="relative" ref={dropdownRef}>
                <KeyboardArrowDownIcon sx={{
                    width: '20px',
                    transform: menuOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                    transition: 'transform 0.4s ease-in-out'
                }} className="-mr-1 ml-2 text-segundaria-900" aria-hidden="true" />
                {menuOpen && (
                    <div className={`absolute top-8 -right-2 z-50 mt-2 w-44 rounded-md shadow-lg bg-segundaria-700 ring-1 ring-black ring-opacity-5 transition-transform duration-300 ease-out transform ${menuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
                        <div className="m-2" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                            <button className='flex rounded-full items-center group hover:bg-segundaria-200 px-2 py-1'>
                                <span className='flex justify-center'>
                                    <SettingsIcon fontSize="small" className="mr-2 text-neutral-600 group-hover:text-segundaria-900 transition duration-300 ease-out" />
                                </span>
                                <span className='text-sm font-medium group-hover:text-segundaria-900 transition duration-300 ease-out'>Configuração</span>
                            </button>
                            <button className='flex items-center group hover:text-segundaria-900 px-2 py-1'>
                                <span> <LinkIcon fontSize="small" className="mr-2 text-neutral-600 group-hover:text-segundaria-900 transition duration-300 ease-out" /> </span>
                                <span className='text-sm font-medium group-hover:text-segundaria-900 transition duration-300 ease-out'>Conectar Conta</span>
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};