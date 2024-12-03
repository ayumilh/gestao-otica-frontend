'use client'
import { useState, useEffect, useRef } from 'react';

const Navbar = () => {
    const [isMobile, setIsMobile] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        window.addEventListener('resize', handleResize);
        handleResize();

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };


    const menuNavbarRef = useRef(null);
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuNavbarRef.current && !menuNavbarRef.current.contains(event.target)) {
                setMenuOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        }
    }, [menuNavbarRef])

    return (
        <div className="flex flex-col">
            <header className="w-full h-20 flex flex-row items-center justify-between pr-3 py-2 xl:px-20 xl:py-5">
                <div className="flex flex-row items-end" ref={menuNavbarRef}>
                    {isMobile ? (
                        <button onClick={toggleMenu} className="text-neutral-800 font-medium text-2xl">
                            ☰
                        </button>
                    ) : (
                        <nav className="animate-link flex space-x-4">
                            <a
                                href="#funcionalidades"
                                className="text-neutral-800 font-medium text-lg transform hover:-translate-y-0.5 hover:scale-60 transition duration-500 ease-in-out"
                            >
                                Funcionalidades
                            </a>
                            <a
                                href="#integracoes"
                                className="text-neutral-800 font-medium text-lg transform hover:-translate-y-0.5 hover:scale-60 transition duration-500 ease-in-out"
                            >
                                Integrações
                            </a>
                            <a
                                href="#sobre"
                                className="text-neutral-800 font-medium text-lg transform hover:-translate-y-0.5 hover:scale-60 transition duration-500 ease-in-out"
                            >
                                Sobre
                            </a>
                            <a
                                href="#planos"
                                className="text-neutral-800 font-medium text-lg transform hover:-translate-y-0.5 hover:scale-60 transition duration-500 ease-in-out"
                            >
                                Planos
                            </a>
                        </nav>
                    )}
                </div>
            </header>
            {isMobile && menuOpen && (
                <nav className="animate-link flex flex-col relative top-10 space-y-3">
                    <a
                        href="#funcionalidades"
                        className="text-neutral-800 font-medium text-lg transform hover:-translate-y-0.5 hover:scale-60 transition duration-500 ease-in-out"
                    >
                        Funcionalidades
                    </a>
                    <a
                        href="#integracoes"
                        className="text-neutral-800 font-medium text-lg transform hover:-translate-y-0.5 hover:scale-60 transition duration-500 ease-in-out"
                    >
                        Integrações
                    </a>
                    <a
                        href="#sobre"
                        className="text-neutral-800 font-medium text-lg transform hover:-translate-y-0.5 hover:scale-60 transition duration-500 ease-in-out"
                    >
                        Sobre
                    </a>
                    <a
                        href="#planos"
                        className="text-neutral-800 font-medium text-lg transform hover:-translate-y-0.5 hover:scale-60 transition duration-500 ease-in-out"
                    >
                        Planos
                    </a>
                </nav>
            )}
        </div>
    );
};

export default Navbar;