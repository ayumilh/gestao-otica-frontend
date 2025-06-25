'use client'

import { authClient } from '@/lib/auth-client';

export async function signUp({ email, password, name }) {
  try {
    const { data, error } = await authClient.signUp.email({
      email,
      password,
      name,
    });

    if (error) throw error;
    return data;
  } catch (err) {
    console.error('❌ Erro ao criar usuário:', err);
    throw err;
  }
}

export async function signIn({ email, password }) {
  try {
    const { data, error } = await authClient.signIn.email({
      email,
      password,
    });

    if (error) {
      console.error('❌ Erro retornado pela API:', error);
      throw new Error(error.message || 'Erro desconhecido no login.');
    }

    console.log('🔐 Dados do login:', data);
    return data;
  } catch (err) {
    console.error('❌ Erro de rede ou inesperado no login:', err);
    throw err;
  }
}

export async function getSession() {
  try {
    const { data, error } = await authClient.getSession();
    if (error) throw error;
    return data;
  } catch (err) {
    console.error('❌ Erro ao obter sessão:', err);
    throw err;
  }
}

export async function signOut() {
  try {
    const { error } = await authClient.signOut();

    if (error) {
      console.error('❌ Erro ao fazer logout:', error);
      throw new Error(error.message || 'Erro ao sair.');
    }
  } catch (err) {
    console.error('❌ Erro de rede ou inesperado no logout:', err);
    throw err;
  }
}

