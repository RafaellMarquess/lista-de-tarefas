import { Link } from 'react-router';

function ItemTarefa({ tarefa, onRemover, onEditar }) {
  return (
    <li className="list-group-item d-flex justify-content-between align-items-center">
      <Link to={`/tarefas/${tarefa.id}`} className="me-auto text-decoration-none">
        {tarefa.texto}
      </Link>

      <button
        className="btn btn-warning btn-sm me-2"
        onClick={() => onEditar(tarefa.id)}
      >
        Editar
      </button>
      <button
        className="btn btn-danger btn-sm"
        onClick={() => onRemover(tarefa.id)}
      >
        X
      </button>
    </li>
  );
}

export default ItemTarefa;
