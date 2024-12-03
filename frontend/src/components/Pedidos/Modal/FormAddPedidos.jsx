'use client'
import { useState } from "react";
import axios from "axios";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import BtnActions from "@/components/Geral/Button/BtnActions";
import SuccessNotification from "@/components/Geral/Notification/SuccessNotification";
import ErrorNotification from "@/components/Geral/Notification/ErrorNotification";

const steps = [
  { titulo: "Informações Basica", subtitulo: "Preencha as informações básicas do seu produto" },
  { titulo: "Caracteristicas", subtitulo: "Defina caracteristicas do seu produto" },
  { titulo: "Preço de venda", subtitulo: "Adicione o preço de venda do seu produto" },
  { titulo: "Tributação", subtitulo: "Adicione informações de tributação do seu produto" },
];


export const FormAddPedidos = () => {
  const [statusRequest, setStatusRequest] = useState('');
  const [activeStep, setActiveStep] = useState(0);

  const handleStepClick = (index, e) => {
    e.preventDefault();
    setActiveStep(index);
  };

  const handleCriar = async () => {
    try{
      const response = await axios.post('https://pos-backend-six.vercel.app/api/produtos/cadastrar', {products});
      setStatusRequest(true);
    } catch (error) {
      setStatusRequest(false);
    }
  }

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <div className="flex flex-col gap-4">
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((step, index) => (
          <Step key={step.titulo}>
            <></>
          </Step>
        ))}
      </Stepper>

      <div className="flex gap-3 my-9">
        {activeStep > 0 && (
          <BtnActions title="Voltar" onClick={handleBack} color="desativado" />
        )}
        {activeStep < 6 ? (
          <BtnActions title="Próximo" onClick={handleNext} color="ativado" />
        ) : (
          <BtnActions title="Criar" onClick={handleCriar} color="ativado" />
        )}
      </div>
      {
        statusRequest === true && <SuccessNotification message='Pedido criado com sucesso!' />
      }
      {
        statusRequest === false && <ErrorNotification message='Não foi possível criar o pedido!' />
      }
    </div>
  )
}
