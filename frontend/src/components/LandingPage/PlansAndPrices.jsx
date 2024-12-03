'use client'
import CheckIcon from "@mui/icons-material/Check";
import Image from "next/image";


const PlansAndPrices = () => {
    return (
        <article className="w-full flex flex-col justify-center items-center mb-80">
            <div className="w-10 mb-3">
                <hr className="w-full border-segundaria-900 border-[1.5px]" />
            </div>
            <h2 className="animate-title-plans text-xl text-center md:text-4xl font-semibold mb-16">
            Planos que se Ajustam ao <br/> <span className="text-segundaria-900">Seu Crescimento</span>
            </h2>
            <div className="flex flex-col lg:flex-row gap-20 lg:gap-4"> 
                <div className="animate-content-bg border border-gray-300 rounded-md p-6 w-80 h-[500px]">
                    <div className="flex gap-5 items-center">
                        <h2 className="text-lg font-semibold">Iniciar</h2>
                    </div>
                    <p className="animate-text-plans text-lg font-medium mt-3 mb-6">
                        Plano Essencial para Pequenos Negócios
                    </p>
                    <div className="animate-text-plans ml-2 py-2">
                        <span className="text-4xl font-semibold">R$260</span>
                        <span className=" text-lg font-light">/mês</span>
                    </div>
                    <ul className="animate-text-plans text-lg font-light list-none mt-4 h-32">
                        <li className="flex items-center mb-2 text-sm font-light">
                            <div className="bg-segundaria-900 rounded-full w-6 h-6 flex items-center justify-center p-1 mr-2">
                                <CheckIcon fontSize="small" className="text-white" />
                            </div>
                            Gerenciamento de Pedidos
                        </li>
                        <li className="flex items-center mb-2 text-sm font-light">
                            <div className="bg-segundaria-900 rounded-full w-6 h-6 flex items-center justify-center p-1 mr-2">
                                <CheckIcon fontSize="small" className="text-white" />
                            </div>
                            Monitoramento de Estoque
                        </li>
                        <li className="flex items-center mb-2 text-sm font-light">
                            <div className="bg-segundaria-900 rounded-full w-6 h-6 flex items-center justify-center p-1 mr-2">
                                <CheckIcon fontSize="small" className="text-white" />
                            </div>
                            Conexão com Fornecedores
                        </li>
                        <li className="flex items-center mb-2 text-sm font-light">
                            <div className="bg-segundaria-900 rounded-full w-6 h-6 flex items-center justify-center p-1 mr-2">
                                <CheckIcon fontSize="small" className="text-white" />
                            </div>
                            Análise de Vendas
                        </li>
                    </ul>
                    <button className="animate-title-plans w-full mt-7 px-3 py-2 bg-segundaria-900 text-white rounded-full hover:bg-segundaria-800 cursor-pointer transition duration-300 ease-in-out">
                        Saiba Mais
                    </button>
                </div>

                <div
                    className="animate-content-bg relative bg-segundaria-900 rounded-md p-6 w-80 h-[500px]"
                    style={{ top: "-35px" }}
                >
                    <span className="absolute -top-4 left-1/2 transform -translate-x-1/2 text-center bg-gray-100 text-segundaria-900 text-sm shadow-md rounded-sm font-semibold px-4 py-2">
                        Popular
                    </span>
                    <div className="flex gap-5 items-center">
                        <h2 className="text-lg font-semibold text-white">Evoluindo</h2>
                    </div>
                    <p className="animate-text-plans text-white text-lg font-light mt-3 mb-6">
                        Plano Avançado para Negócios em Crescimento
                    </p>
                    <div className="animate-text-plans ml-2 py-2">
                        <span className="text-white text-4xl font-semibold">R$320</span>
                        <span className="text-white text-lg font-light">/mês</span>
                    </div>
                    <ul className="animate-text-plans text-white text-lg font-light list-none mt-4">
                        <li className="flex items-center mb-2 text-sm font-light">
                            <div className="bg-white rounded-full w-6 h-6 flex items-center justify-center p-1 mr-2">
                                <CheckIcon fontSize="small" className="text-segundaria-900" />
                            </div>
                            Gerenciamento Avançado de Pedidos
                        </li>
                        <li className="flex items-center mb-2 text-sm font-light">
                            <div className="bg-white rounded-full w-6 h-6 flex items-center justify-center p-1 mr-2">
                                <CheckIcon fontSize="small" className="text-segundaria-900" />
                            </div>
                            Controle de Estoque Inteligente
                        </li>
                        <li className="flex items-center mb-2 text-sm font-light">
                            <div className="bg-white rounded-full w-6 h-6 flex items-center justify-center p-1 mr-2">
                                <CheckIcon fontSize="small" className="text-segundaria-900" />
                            </div>
                            Integração Ampliada com Fornecedores
                        </li>
                        <li className="flex items-center mb-2 text-sm font-light">
                            <div className="bg-white rounded-full w-6 h-6 flex items-center justify-center p-1 mr-2">
                                <CheckIcon fontSize="small" className="text-segundaria-900" />
                            </div>
                            Relatórios de Vendas Detalhados
                        </li>
                    </ul>
                    <button className="animate-title-plans w-full mt-7 px-3 py-2 bg-white text-segundaria-900 rounded-full hover:bg-gray-200 cursor-pointer transition duration-300 ease-in-out">
                        Saiba Mais
                    </button>
                </div>

                <div className="animate-content-bg border border-gray-300 rounded-md p-6 w-80 h-[500px]">
                    <div className="flex gap-5 items-center">
                        <h2 className="text-lg font-semibold">Potencializando</h2>
                    </div>
                    <p className="animate-text-plans text-lg font-medium mt-3 mb-6">
                        Plano Premium para Grandes Empresas.
                    </p>
                    <div className="animate-text-plans ml-2 py-2">
                        <span className="text-4xl font-semibold">R$390</span>
                        <span className=" text-lg font-light">/mês</span>
                    </div>
                    <ul className="animate-text-plans text-lg font-light list-none mt-4 h-32">
                        <li className="flex items-center mb-2 text-sm font-light">
                            <div className="bg-segundaria-900 rounded-full w-6 h-6 flex items-center justify-center p-1 mr-2">
                                <CheckIcon fontSize="small" className="text-white" />
                            </div>
                            Gestão Completa de Pedidos
                        </li>
                        <li className="flex items-center mb-2 text-sm font-light">
                            <div className="bg-segundaria-900 rounded-full w-6 h-6 flex items-center justify-center p-1 mr-2">
                                <CheckIcon fontSize="small" className="text-white" />
                            </div>
                            Otimização de Estoque
                        </li>
                        <li className="flex items-center mb-2 text-sm font-light">
                            <div className="bg-segundaria-900 rounded-full w-6 h-6 flex items-center justify-center p-1 mr-2">
                                <CheckIcon fontSize="small" className="text-white" />
                            </div>
                            Parcerias Estratégicas com Fornecedores
                        </li>
                        <li className="flex items-center mb-2 text-sm font-light">
                            <div className="bg-segundaria-900 rounded-full w-6 h-6 flex items-center justify-center p-1 mr-2">
                                <CheckIcon fontSize="small" className="text-white" />
                            </div>
                            Análise Avançada de Vendas
                        </li>
                    </ul>
                    <button className="animate-title-plans w-full mt-7 px-3 py-2 bg-segundaria-900 text-white rounded-full hover:bg-segundaria-800 cursor-pointer transition duration-300 ease-in-out">
                        Saiba Mais
                    </button>
                </div>
            </div>
        </article>
    )
}
export default PlansAndPrices;