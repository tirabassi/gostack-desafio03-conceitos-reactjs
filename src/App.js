import React, { useEffect, useState } from "react";
import api from "./services/api";

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    const getRepositories = async () => {
      const resp = await api.get("repositories");

      if (resp) {
        setRepositories(resp.data);
      }
    };
    getRepositories();
  }, []);

  async function handleAddRepository() {
    const repository = await api.post("repositories", {
      title: "Teste",
      url: "wwww",
      teches: ["React", "Node.js"],
    });

    if (repository) {
      setRepositories([...repositories, repository.data]);
    }
  }

  async function handleRemoveRepository(id) {
    const resp = await api.delete(`repositories/${id}`);

    if (resp.status === 204) {
      setRepositories(
        repositories.filter((repository) => repository.id !== id)
      );
    }
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map((repository) => (
          <li key={repository.id}>
            {repository.title}
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
