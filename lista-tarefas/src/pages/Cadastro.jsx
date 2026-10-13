import { useState } from 'react';
import { Link, Navigate, useLocation, useNavigate } from 'react-router';
import { useAuth } from '../context/AuthContext';

const SENHA_MINIMA = 6;

function Cadastro() {
  const { usuario, cadastrar } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmacao, setConfirmacao] = useState('');
  const [erro, setErro] = useState('');
  const [enviando, setEnviando] = useState(false);

  const destino = location.state?.from?.pathname || '/tarefas';

  if (usuario) {
    return <Navigate to={destino} replace />;
  }

  function validar() {
    if (nome.trim() === '' || email.trim() === '' || senha === '') {
      return 'Preencha todos os campos.';
    }
    if (!/^\S+@\S+\.\S+$/.test(email.trim())) {
      return 'Digite um e-mail válido.';
    }
    if (senha.length < SENHA_MINIMA) {
      return `A senha deve ter pelo menos ${SENHA_MINIMA} caracteres.`;
    }
    if (senha !== confirmacao) {
      return 'As senhas não conferem.';
    }
    return '';
  }

  async function enviar(e) {
    e.preventDefault();

    const mensagem = validar();
    if (mensagem) {
      setErro(mensagem);
      return;
    }

    setErro('');
    setEnviando(true);
    const resultado = await cadastrar({ nome, email, senha });
    setEnviando(false);

    if (!resultado.ok) {
      setErro(resultado.erro);
      return;
    }

    navigate(destino, { replace: true });
  }

  return (
    <div className="container mt-5" style={{ maxWidth: 420 }}>
      <h1 className="mb-4">Criar conta</h1>

      <form onSubmit={enviar} noValidate>
        {erro && (
          <div className="alert alert-danger" role="alert">
            {erro}
          </div>
        )}

        <div className="mb-3">
          <label htmlFor="nome" className="form-label">Nome</label>
          <input
            id="nome"
            className="form-control"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            autoComplete="name"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="email" className="form-label">E-mail</label>
          <input
            id="email"
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="username"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="senha" className="form-label">Senha</label>
          <input
            id="senha"
            type="password"
            className="form-control"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            autoComplete="new-password"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="confirmacao" className="form-label">Confirmar senha</label>
          <input
            id="confirmacao"
            type="password"
            className="form-control"
            value={confirmacao}
            onChange={(e) => setConfirmacao(e.target.value)}
            autoComplete="new-password"
          />
        </div>

        <button type="submit" className="btn btn-primary w-100" disabled={enviando}>
          {enviando ? 'Criando conta...' : 'Cadastrar'}
        </button>
      </form>

      <p className="mt-3">
        Já tem conta? <Link to="/login" state={location.state}>Entrar</Link>
      </p>
    </div>
  );
}

export default Cadastro;
