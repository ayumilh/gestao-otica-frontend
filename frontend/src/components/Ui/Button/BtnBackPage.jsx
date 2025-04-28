"use client";
import ArrowBackIosRoundedIcon from "@mui/icons-material/ArrowBackIosRounded";
import { useRouter } from "next/navigation";

const BtnBackPage = ({ title, modal, onClose = () => {} }) => {
  const router = useRouter();
  return (
    <div className="flex flex-row items-center">
      <button
        type="button"
        className="flex items-center justify-center active:text-orange-500 hover:text-orange-400 transition duration-300 ease-in-out cursor-pointer py-2"
        onClick={() => { router.back() }}
      >
        <ArrowBackIosRoundedIcon
          fontSize="small"
          className="text-segundaria-900 active:text-orange-500 hover:text-orange-400 transition duration-300 ease-in-out"
        />
        <span
          className={
            "font-light text-center text-lg text-segundaria-900 active:text-orange-500 hover:text-orange-400 transition duration-300 ease-in-out ml-2"
          }
        >
          {title}
        </span>
      </button>
    </div>
  );
};

export default BtnBackPage;
