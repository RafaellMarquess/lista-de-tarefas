import { createContext, useContext, useState } from 'react';
import * as authService from '../services/authService';

const CHAVE_SESSAO = 'usuario-logado';
const AuthContext = createContext(null);

function lerSessao() {
  try {
    return JSON.parse(localStorage.getItem(CHAVE_SESSAO));
  } catch {
    return null;
  }
}

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(lerSessao);

  function iniciarSessao(dados) {
    localStorage.setItem(CHAVE_SESSAO, JSON.stringify(dados));
    setUsuario(dados);
  }

  async function login(email, senha) {
    const resultado = await authService.entrar(email, senha);
    if (resultado.ok) iniciarSessao(resultado.usuario);
    return resultado;
  }

  async function cadastrar(dados) {
    const resultado = await authService.cadastrar(dados);
    if (resultado.ok) iniciarSessao(resultado.usuario);
    return resultado;
  }

  function logout() {
    localStorage.removeItem(CHAVE_SESSAO);
    setUsuario(null);
  }

  return (
    <AuthContext.Provider value={{ usuario, login, cadastrar, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
