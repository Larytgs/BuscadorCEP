import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import "./style.css";
import api from "./services/api";

function App() {
  const [input, setInput] = useState("");
  const [cep, setCep] = useState("");

  async function handleSearch() {
    if (input.trim() === "") {
      alert("Preencha algum CEP!");
      return;
    }

    setCep({}); // <- Limpa ANTES de buscar

    try {
      const response = await api.get(`/api/${input}/json`);

      if (response.data.erro) {
        alert("CEP não encontrado!");
        setInput("");
        return;
      }
      setCep({ ...response.data }); // força novo objeto
      setInput("");
    } catch {
      alert("Opss.. erro ao buscar o CEP.");
      setInput("");
    }
  }

  return (
    <>
      <div className="container">
        <h1 className="title">Buscador CEP</h1>

        <div className="containerInput">
          <input
            type="text"
            placeholder="Digite seu CEP sem hifen..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />

          <button className="button" onClick={handleSearch}>
            <FiSearch size={25} color="#fff" />
          </button>
        </div>

        {Object.keys(cep).length > 0 && (
          <main className="main">
            <h2>CEP: {cep.cep}</h2>
            <span>Rua: {cep.logradouro}</span>
            <span>Complemento:{cep.complemento}</span>
            <span>Bairro: {cep.bairro}</span>
            <span>
              {cep.localidade}-{cep.uf}
            </span>
          </main>
        )}
      </div>
    </>
  );
}

export default App;
