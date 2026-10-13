import { Link, useParams } from 'react-router';

function DetalheTarefa({ tarefas }) {
  const { id } = useParams();
  const tarefa = tarefas.find((t) => String(t.id) === id);

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Detalhe da tarefa</h1>

      {tarefa ? (
        <div className="card card-body mb-3">{tarefa.texto}</div>
      ) : (
        <p>Tarefa não encontrada.</p>
      )}

      <Link className="btn btn-secondary" to="/tarefas">Voltar</Link>
    </div>
  );
}

export default DetalheTarefa;
