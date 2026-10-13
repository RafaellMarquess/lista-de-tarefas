import { Navigate, useLocation } from 'react-router';
import { useAuth } from '../context/AuthContext';

function RotaProtegida({ children }) {
  const { usuario } = useAuth();
  const location = useLocation();

  if (!usuario) {
    // guarda a página pedida para voltar a ela depois do login
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return children;
}

export default RotaProtegida;
