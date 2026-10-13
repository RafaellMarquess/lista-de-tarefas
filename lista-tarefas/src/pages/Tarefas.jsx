import { useState } from 'react';
import ItemTarefa from '../components/ItemTarefa';

function Tarefas({ tarefas, onAdicionar, onRemover, onEditar }) {
  const [texto, setTexto] = useState('');

  function adicionar() {
    if (texto.trim() === '') return;
    onAdicionar(texto);
    setTexto('');
  }

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Minhas Tarefas</h1>

      <div className="input-group mb-3">
        <input
          className="form-control"
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
          placeholder="Nova tarefa"
        />
        <button className="btn btn-primary" onClick={adicionar}>
          Adicionar
        </button>
      </div>

      <ul className="list-group">
        {tarefas.map((tarefa) => (
          <ItemTarefa
            key={tarefa.id}
            tarefa={tarefa}
            onRemover={onRemover}
            onEditar={onEditar}
          />
        ))}
      </ul>
    </div>
  );
}

export default Tarefas;
