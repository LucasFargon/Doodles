import axios from "axios";
import { useState } from "react";
import Noodles from "../assets/noodles.png";

const Search = () => {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [results, setResults] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!query) {
      return;
    }
    setLoading(true);
    setError("");
    try {
        const URL = 'http://localhost:4000/search'
        const res = await axios.get(URL, {
            params:{
                query
            }
        })

        const data = res.data.organic_results || [];
        setResults(data);
    } catch (err) {
      console.error(err);
      setError("Não foi possível fazer a busca");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <div className="Logo">
        <h1>Noodle</h1>
        <img src={Noodles} alt="Noodles" />
      </div>
      <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="search"
            placeholder="Digite sua busca"
            onChange={(e) => setQuery(e.target.value)}
          />
        <button type="submit">Buscar</button>
      </form>
      <div>
          {error ? (
            <p>{error}</p>
          ) : loading ? (
            <p>Carregando...</p>
          ) : (
            <ul>
              {results.map((result, index) => {
                return (
                    <li key={index}>
                  <a href={result.link} target="_blank" rel="noopener noreferrer">
                    {result.title}
                  </a>
                  <p>{result.snippet}</p>
                </li>
                );
                
              })}
            </ul>
          )}
      </div>
    </div>
  );
};

export default Search;
