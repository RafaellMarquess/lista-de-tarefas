import { useState } from 'react';
import { Link, Navigate, useLocation, useNavigate } from 'react-router';
import { useAuth } from '../context/AuthContext';

function Login() {
  const { usuario, login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const [enviando, setEnviando] = useState(false);

  const destino = location.state?.from?.pathname || '/tarefas';


  if (usuario) {
    return <Navigate to={destino} replace />;
  }

  async function enviar(e) {
    e.preventDefault();

    if (email.trim() === '' || senha === '') {
      setErro('Preencha o e-mail e a senha.');
      return;
    }

    setErro('');
    setEnviando(true);
    const resultado = await login(email, senha);
    setEnviando(false);

    if (!resultado.ok) {
      setErro(resultado.erro);
      return;
    }

    navigate(destino, { replace: true });
  }

  return (
    <div className="container mt-5" style={{ maxWidth: 420 }}>
      <h1 className="mb-4">Login</h1>

      <form onSubmit={enviar} noValidate>
        {erro && (
          <div className="alert alert-danger" role="alert">
            {erro}
          </div>
        )}

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
            autoComplete="current-password"
          />
        </div>

        <button type="submit" className="btn btn-primary w-100" disabled={enviando}>
          {enviando ? 'Entrando...' : 'Entrar'}
        </button>
      </form>

      <p className="mt-3">
        Não tem conta? <Link to="/cadastro" state={location.state}>Cadastre-se</Link>
      </p>
      <p className="text-muted small">Teste: admin@teste.com / 123456</p>
    </div>
  );
}

export default Login;
