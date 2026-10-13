import { Link, NavLink, useNavigate } from 'react-router';
import { useAuth } from '../context/AuthContext';

function NavBar() {
  const { usuario, logout } = useAuth();
  const navigate = useNavigate();

  function sair() {
    logout();
    navigate('/login');
  }

  return (
    <nav className="navbar navbar-expand navbar-dark bg-dark px-3">
      <Link className="navbar-brand" to="/">Lista de Tarefas</Link>

      <div className="navbar-nav me-auto">
        <NavLink className="nav-link" to="/">Início</NavLink>
        <NavLink className="nav-link" to="/tarefas">Tarefas</NavLink>
      </div>

      {usuario ? (
        <div className="d-flex align-items-center gap-3">
          <span className="navbar-text">Olá, {usuario.nome}</span>
          <button className="btn btn-outline-light btn-sm" onClick={sair}>
            Sair
          </button>
        </div>
      ) : (
        <NavLink className="btn btn-outline-light btn-sm" to="/login">
          Entrar
        </NavLink>
      )}
    </nav>
  );
}

export default NavBar;
