"use client";

import FormContent from "@/components/Login/FormContent";
import Image from "next/image";

export default function Home() {

  const criarCheckout = async (vendaId, price, email) => {
    try {
      const response = await fetch('http://localhost:4000/api/stripe/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          price: price,        // Ex: 10000 = R$100,00
          email: email,        // Email do cliente
          vendaId: vendaId,    // ID da venda (opcional)
        }),
      });

      const data = await response.json();

      if (data.url) {
        window.location.href = data.url; // Redireciona pro Stripe Checkout
      } else {
        console.error('Erro ao criar checkout:', data.error);
      }
    } catch (error) {
      console.error('Erro:', error);
    }
  };

  return (
    <main className="flex min-h-screen flex-row items-center justify-evenly lg:justify-between dark:bg-bg">
      <FormContent />
      <div className="hidden lg:flex flex-col justify-center lg:w-[530px] xl:w-[720px] h-screen">
        <h2 className="text-2xl font-semibold mb-3 dark:text-neutral-800">Bem-vindo!</h2>
        <p className="w-full text-base font-medium mb-14 dark:text-neutral-800">
          Ótica de excelência começa aqui{" "}
          <span className="text-segundaria-900 dark:text-segundaria-900">
            acesse sua conta.
          </span>
        </p>
        <Image
          src="/img/remoteWork.svg"
          alt="Ilustração de uma mulher"
          width={500}
          height={340}
        />

        {/* ✅ Botão de Teste */}
        <button
          onClick={() => criarCheckout(15, 10000, "cliente@email.com")}
          className="mt-5 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Testar Pagamento
        </button>
      </div>
    </main>
  );
}
