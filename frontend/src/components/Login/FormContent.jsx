'use client'
import { useState, useRef, useEffect } from 'react'
import { signIn } from '@/lib/auth-api';
import { useRouter } from 'next/navigation';
import { Email } from "@mui/icons-material"
import LockIcon from "@mui/icons-material/Lock"
import { IconButton } from "@mui/material"
import CircularProgress from '@mui/material/CircularProgress';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';


const FormContent = () => {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState(null)
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loggingLoading, setLoggingLoading] = useState(false)
  const [errors, setErrors] = useState({});

  const handleLogin = async (event) => {
    event.preventDefault();
    setLoggingLoading(true);
    setErrorMessage('');
    setErrors({});

    try {
      const response = await fetch('http://localhost:4000/api/auth/sign-in/email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',  // ✅ ESSENCIAL para gravar o cookie no navegador
        body: JSON.stringify({
          email,
          password,
        }),
      });

      if (!response.ok) {
        console.error('❌ Erro na resposta:', response.status);
        setErrorMessage('Email ou senha inválidos.');
        return;
      }

      const data = await response.json();
      console.log('✅ Login bem-sucedido:', data);

      // Se quiser, pode validar se veio o token também:
      if (data.token) {
        router.push('/inicio');  // ✅ Redireciona se deu certo
      } else {
        setErrorMessage('Falha ao realizar login. Tente novamente.');
      }

    } catch (error) {
      console.error('❌ Erro no login:', error);
      setErrorMessage('Erro interno. Tente novamente.');
    } finally {
      setLoggingLoading(false);
    }
  };



  const [showPassword, setShowPassword] = useState(false)
  const handleClickShowPassword = () => (
    setShowPassword(!showPassword)
  )
  const handleMouseDownPassword = (event) => {
    event.preventDefault()
  }

  const emailInputRef = useRef(null);
  useEffect(() => {
    emailInputRef.current.focus();
  }, []);

  return (
    <div className='rounded-[32px] lg:mx-auto'>
      <form className="form-login w-[348px] md:w-[500px] lg:w-[450px] xl:w-[540px] h-full py-8 md:py-12 px-6 md:px-11 lg:px-8 xl:px-11 space-y-8 my-6">

        <p className="text-3xl font-medium text-start dark:text-neutral-800">Entrar</p>

        <div className="flex flex-col space-y-6 items-end">

          <div className="w-full">
            <label className="block text-sm font-normal mb-2 dark:text-neutral-800" htmlFor="email">
              E-mail
            </label>
            <div className="mt-1 relative rounded-md">
              <div className="absolute inset-y-0 left-0 pl-4 pt-3 pb-2 flex items-center pointer-events-none">
                <Email sx={{ width: '16px' }} className="text-segundaria-900 mr-2" />
              </div>
              <input
                className="self-stretch form-input block w-full pl-10 pt-3 pb-2 border-2 dark:text-neutral-800 border-gray-600 rounded-xl bg-transparent hover:border-amber-700 focus:border-segundaria-800 focus:outline-none"
                ref={emailInputRef}
                type="email"
                name="email"
                value={email}
                placeholder='mail@gmail.com'
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="w-full">
            <label className="block text-sm font-normal mb-2 dark:text-neutral-800" htmlFor="password">
              Senha
            </label>
            <div className="mt-1 relative rounded-md hover:bg-transparent">
              <div className="absolute inset-y-0 left-0 pl-4 pt-4 pb-2 flex items-center pointer-events-none mb-2">
                <LockIcon sx={{ width: '16px' }} className="text-segundaria-900 mr-2" />
              </div>
              <input
                className="self-stretch form-input block w-full pl-10 pt-3 pb-2 border-2 dark:text-neutral-800 border-gray-600 rounded-xl bg-transparent hover:border-amber-700 focus:border-segundaria-900 focus:outline-none"
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={password}
                placeholder='*******'
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <div className="absolute inset-y-0 right-0 pr-3 pt-3 pb-2 flex items-center mb-1 md:mb-2 cursor-pointer">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  {showPassword ? <VisibilityOff className='text-gray-700 dark:text-gray-700' /> : <Visibility className='text-gray-700 dark:text-gray-700' />}
                </IconButton>
              </div>
            </div>
            {errorMessage && <p className="text-red-500 dark:text-red-500 text-sm">{errorMessage}</p>}
          </div>
        </div>

        {errors.login && <span className='text-red-500 text-sm'>{errors.login}</span>}

        <button type='submit' onClick={handleLogin} className="w-full text-white bg-orange-400 hover:bg-segundaria-900 active:scale-90 active:bg-segundaria-900 active:ring active:ring-orange-400 font-medium p-3 transition duration-500 ease-in-out text-lg rounded-full shadow shadow-orange">
          {loggingLoading ? (
            <><CircularProgress color="inherit" className="text-white mr-1" size={12} /> Entrando...</>
          ) : (
            <span className='w-[72px] md:w-full text-white overflow-hidden' style={{ textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>Entrar</span>
          )}
        </button>
      </form>
    </div>
  )
}

export default FormContent