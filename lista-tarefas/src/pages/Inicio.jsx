import { Link } from 'react-router';
import { useAuth } from '../context/AuthContext';

function Inicio() {
  const { usuario } = useAuth();

  return (
    <div className="container mt-5">
      <h1>Bem-vindo à Lista de Tarefas</h1>
      <p className="lead">
        {usuario
          ? `Você está logado como ${usuario.nome}.`
          : 'Faça login para gerenciar suas tarefas.'}
      </p>
      <Link className="btn btn-primary" to={usuario ? '/tarefas' : '/login'}>
        {usuario ? 'Ver tarefas' : 'Entrar'}
      </Link>
    </div>
  );
}

export default Inicio;
