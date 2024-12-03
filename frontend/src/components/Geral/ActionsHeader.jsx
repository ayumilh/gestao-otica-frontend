'use client'
import { useState } from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { EmailAddressUser } from "./EmailAddressUser";

const ActionsHeader = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    
    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <div className="w-full items-center justify-center lg:flex hidden">
            <div onClick={toggleMenu} className="w-full flex justify-between pl-2 pr-4 py-2 cursor-pointer">
                <AccountCircleIcon className="h-6 w-6 text-neutral-700" />
                <button
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        gap: "12px",
                        color: "blue",
                        fontSize: "14px",
                        marginLeft: "8px",
                    }}
                >
                    <EmailAddressUser menuOpen={menuOpen} toggleMenu={toggleMenu} />
                </button>
            </div>
        </div>
    );
};

export default ActionsHeader;
