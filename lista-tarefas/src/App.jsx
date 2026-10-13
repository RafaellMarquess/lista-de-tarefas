import { useState } from 'react';
import { Routes, Route } from 'react-router';
import NavBar from './components/NavBar';
import RotaProtegida from './components/RotaProtegida';
import Inicio from './pages/inicio';
import Login from './pages/Login';
import Cadastro from './pages/Cadastro';
import Tarefas from './pages/Tarefas';
import DetalheTarefa from './pages/DetalheTarefa';
import NaoEncontrada from './pages/NaoEncontrada';
import './App.css';

function App() {
  const [tarefas, setTarefas] = useState([]);

  function adicionar(texto) {
    setTarefas([...tarefas, { id: Date.now(), texto }]);
  }

  function remover(id) {
    setTarefas(tarefas.filter((tarefa) => tarefa.id !== id));
  }

  function editar(id) {
    const novoTexto = prompt('Digite a nova tarefa:');
    if (novoTexto === null || novoTexto.trim() === '') return;

    setTarefas(
      tarefas.map((tarefa) =>
        tarefa.id === id ? { ...tarefa, texto: novoTexto } : tarefa
      )
    );
  }

  return (
    <>
      <NavBar />

      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />

        <Route
          path="/tarefas"
          element={
            <RotaProtegida>
              <Tarefas
                tarefas={tarefas}
                onAdicionar={adicionar}
                onRemover={remover}
                onEditar={editar}
              />
            </RotaProtegida>
          }
        />
        <Route
          path="/tarefas/:id"
          element={
            <RotaProtegida>
              <DetalheTarefa tarefas={tarefas} />
            </RotaProtegida>
          }
        />

        <Route path="*" element={<NaoEncontrada />} />
      </Routes>
    </>
  );
}

export default App;
