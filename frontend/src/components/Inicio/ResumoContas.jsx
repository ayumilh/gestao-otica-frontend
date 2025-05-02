'use client';
import BtnAtivado from '@/components/Ui/Button/BtnAtivado';

const ResumoContas = () => {
  return (
    <div className='w-full flex flex-col xl:flex-row gap-7'>
      {/* Contas a receber */}
      <div className='bg-bg dark:bg-dark-primaria-800 w-full xl:w-1/2 flex flex-col h-full rounded-xl px-5 py-7 ring-1 ring-gray-100 dark:ring-1 dark:ring-black ring-opacity-5 shadow-md'>
        <div className='flex justify-between items-center'>
          <p className='text-neutral-700 font-semibold pt-2 text-start'>Valor recebido</p>
        </div>

        <div className='w-36 bg-green-100 px-4 py-3 rounded-lg mt-2'>
          <span className='block font-medium text-green-600 dark:text-green-600'>R$ 0,00</span>
          <span className='text-xs font-medium text dark:text-neutral-800'>Vencendo hoje</span>
        </div>

        <hr className='my-5' />

        <div className='w-full flex flex-col items-center justify-center gap-5'>
          <span className='text-center text-sm font-medium'>
            Você não possui recebimentos em aberto <br /> nos próximos 3 dias.
          </span>
          <BtnAtivado title='Criar Recebimento' onClick="/clientes" page="/clientes/criar" size="sm" rounded="md" />
        </div>
      </div>

      {/* Contas a pagar */}
      <div className='bg-bg dark:bg-dark-primaria-800 w-full xl:w-1/2 flex flex-col h-full rounded-xl px-5 py-7 ring-1 ring-gray-100 dark:ring-1 dark:ring-black ring-opacity-5 shadow-md'>
        <div className='flex justify-between items-center'>
          <p className='text-neutral-700 font-semibold pt-2 text-start'>A receber</p>
        </div>

        <div className='w-36 bg-yellow-100 px-4 py-3 rounded-lg mt-2'>
          <span className='block font-medium text-yellow-600 dark:text-yellow-600'>R$ 0,00</span>
          <span className='text-xs font-medium text dark:text-neutral-800'>Vencendo hoje</span>
        </div>

        <hr className='my-5' />

        <div className='w-full flex flex-col items-center justify-center gap-5'>
          <span className='text-center text-sm font-medium'>
            Você não possui pagamentos em aberto <br /> no próximos 30 dias.
          </span>
          <BtnAtivado title='Criar Pagamento' onClick="/clientes" page="/clientes/criar" size="sm" rounded="md" />
        </div>
      </div>
    </div>
  );
};

export default ResumoContas;
