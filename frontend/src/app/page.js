import BtnAtivado from '@/components/Geral/Button/BtnAtivado';
import Navbar from '@/components/LandingPage/Navbar';
import PlansAndPrices from '@/components/LandingPage/PlansAndPrices';
import AddIcon from '@mui/icons-material/Add';
import Image from 'next/image';

export default function Home() {
    return (
        <div className="w-full flex flex-col mx-auto">
            <header className="w-full flex flex-row items-center justify-between px-3 md:px-5 xl:px-20 pt-5">
                <div className="w-full flex justify-end lg:justify-normal flex-row-reverse lg:flex-row items-center lg:gap-4">
                    <div>
                        <h1 className='text-segundaria-900 text-3xl font-semibold'>OwnSystem</h1>
                    </div>
                    <Navbar />
                </div>

                <div className="flex w-full flex-row justify-end items-center gap-4">
                    <button className="hidden lg:flex bg-gray-50 hover:bg-gray-100 shadow-sm rounded-md px-3 py-1 transform hover:-translate-y-0.5 hover:scale-60 transition duration-500 ease-in-out">
                        <a
                            className="w-full text-neutral-700 font-medium text-sm"
                        >
                            Teste Grátis
                        </a>
                    </button>
                    <button className="bg-segundaria-900 hover:bg-segundaria-800 shadow-md hover:shadow-lg rounded-md px-3 py-1 transform hover:-translate-y-0.5 hover:scale-60 transition duration-500 ease-in-out">
                        <a href="/login" className="text-white font-medium text-sm">
                            Entrar
                        </a>
                    </button>
                </div>
            </header>

            <main className='w-full h-[880px] flex px-5 xl:px-20 py-5 lg:mt-20'>
                <div className='w-full md:w-1/2 flex flex-col items-start gap-6'>
                    <h3 className='text-6xl font-semibold'>
                        Transforme a <span className='text-segundaria-900'>Gestão do Seu Negócio</span> com Nosso Sistema Integrado
                    </h3>
                    <p className='md:w-[640px] font-medium'>
                        Aliquam vel platea curabitur sit vestibulum egestas sit id lorem. Aliquet neque, dui sed eget scelerisque. Non at at venenatis tortor amet feugiat ullamcorper in. Odio vulputate cras vel lacinia turpis volutpat adipiscing. Sollicitudin at velit, blandit tempus nunc in.
                    </p>

                    <div>
                        <button className="bg-segundaria-900 hover:bg-segundaria-800 text-white text-lg font-semibold shadow-md hover:shadow-lg rounded-md px-4 py-2 transform hover:-translate-y-0.5 hover:scale-60 transition duration-500 ease-in-out">
                            Teste Grátis
                        </button>
                        <button className="text-segundaria-800 items-center text-lg font-medium rounded-md px-3 py-1 transform hover:-translate-y-0.5 hover:scale-60 transition duration-500 ease-in-out">
                            <AddIcon /> Descubra mais 
                        </button>
                    </div>
                </div>
                <div className='w-1/2 hidden md:flex flex-col items-center'>
                    <div>
                        <Image src='/img/LandingPage/mochup.png' width={700} height={500} />
                    </div>
                </div>

            </main>

            <PlansAndPrices />
        </div>
    );
}