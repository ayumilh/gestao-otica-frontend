import FormContent from "@/components/Login/FormContent";
import Image from "next/image";

export default function Login() {
  return (
    <main className="flex min-h-screen flex-row items-center justify-evenly lg:justify-between">
      <FormContent />
      <div className="hidden lg:flex flex-col justify-center lg:w-[530px] xl:w-[720px] h-screen">
        <h2 className="text-2xl font-semibold mb-3">Bem-vindo!</h2>
        <p className="w-full text-base font-medium mb-14">Ótica de excelência começa aqui <span className="text-segundaria-900">acesse sua conta.</span></p>
        <Image src="/img/remoteWork.svg" alt="Ilustração de uma mulher" width={500} height={340} />
      </div>
    </main>
  );
}