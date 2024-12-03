'use client'
import { useState, useRef, useEffect } from 'react';
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

const DropdownFilterWeek = () => {
    const [isOpenWeek, setIsOpenWeek] = useState(false);

    const toggleDropdown = () => {
        setIsOpenWeek(!isOpenWeek);
    };

    const dropdownWeekRef = useRef(null);
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownWeekRef.current && !dropdownWeekRef.current.contains(event.target)) {
                setIsOpenWeek(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        }
    }, [dropdownWeekRef]);

    return (
        <div className="relative inline-block text-left" ref={dropdownWeekRef}>
            <button
                className="bg-neutral-200 flex items-center space-x-2 transition duration-300 ease-in-out rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-gray-300 cursor-pointer"
                onClick={toggleDropdown}
            >
                <span className="text-neutral-700 text-sm font-medium">Hoje</span>
                <KeyboardArrowDownIcon className={`-mr-1 ml-2 md:ml-0 h-5 w-5 text-segundaria-900 cursor-pointer transition-transform duration-500 ${isOpenWeek ? 'rotate-180' : ''}`} />
            </button>

            {isOpenWeek && (
                <div className={`w-[108px] absolute top-8 right-0 z-20 mt-2 rounded-md shadow-lg bg-segundaria-700 ring-1 ring-black ring-opacity-5 transition-transform duration-300 ease-out transform ${isOpenWeek ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
                    <div className='my-2' role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                        <button className="w-full flex px-4 py-2 text-sm text-neutral-700 font-medium hover:bg-gray-200 active:bg-gray-100 rounded-sm transition duration-300 ease-in-out" role="menuitem">1 Semana</button>
                        <button className="w-full flex px-4 py-2 text-sm text-neutral-700 font-medium hover:bg-gray-200 active:bg-gray-100 rounded-sm transition duration-300 ease-in-out" role="menuitem">15 dias</button>
                        <button className="w-full flex px-4 py-2 text-sm text-neutral-700 font-medium hover:bg-gray-200 active:bg-gray-100 rounded-sm transition duration-300 ease-in-out" role="menuitem">1 mês</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DropdownFilterWeek;