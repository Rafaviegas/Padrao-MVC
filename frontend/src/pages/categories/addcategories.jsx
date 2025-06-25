import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './addcategories.css';

function AddCategorie() {
  const [name, setName] = useState('');
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:3000/categorias', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ nome: name })
      });

      if (res.ok) {
        alert('Categoria cadastrada com sucesso!');
        setName('');
        navigate('/categories');
      } else {
        alert('Erro ao cadastrar categoria.');
      }
    } catch (error) {
      console.error(error);
      alert('Erro ao conectar com o servidor.');
    }
  };

  return (
    <div id="add-categorie">
      <form onSubmit={handleSubmit}>
        <Link to='/home'>Voltar para a home</Link>
        <h2>Cadastrar Categoria</h2>
        <input
          type="text"
          placeholder="Nome da Categoria"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <button className="button" type="submit">Cadastrar</button>
      </form>
    </div>
  );
}

export default AddCategorie;
