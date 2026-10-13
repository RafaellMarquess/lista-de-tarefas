import { Link } from 'react-router';

function NaoEncontrada() {
  return (
    <div className="container mt-5">
      <h1>404 - Página não encontrada</h1>
      <Link to="/">Voltar ao início</Link>
    </div>
  );
}

export default NaoEncontrada;
