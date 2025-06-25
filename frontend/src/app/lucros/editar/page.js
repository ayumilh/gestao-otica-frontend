import { FormEditarLucros } from '@/components/Lucros/Editar/FormEditarLucros';
import BtnBackPage from '@/components/Ui/Button/BtnBackPage';

export default async function Editar() {

  return (
    <main className="px-4 pt-4 lg:px-6 mx-auto flex flex-col items-center">
      <div className="w-full xl:max-w-[1300px] flex justify-between items-center h-12 mb-6 md:mb-8 lg:mb-10">
        <BtnBackPage title="Editar Lucros" modal={false} />
      </div>

      <FormEditarLucros />
    </main>
  );
}