import { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import './editCategories.css';

function EditCategories() {
  const { id } = useParams();
  const [nome, setName] = useState('');
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const res = await fetch(`http://localhost:3000/categorias/${id}`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        setName(data.nome);
      } catch (err) {
        console.error('Erro ao carregar categoria:', err);
        alert('Erro ao carregar categoria');
      }
    };

    fetchCategory();
  }, [id, token]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`http://localhost:3000/categorias/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ nome }),
      });

      if (res.ok) {
        alert('Categoria atualizada com sucesso!');
        navigate('/categories');
      } else {
        alert('Erro ao atualizar categoria');
      }
    } catch (err) {
      console.error('Erro ao atualizar:', err);
    }
  };

  return (
    <div id="edit-categorie">
      <form onSubmit={handleSubmit}>
        <Link to='/home'>Voltar para a home</Link>
        <h2>Editar Categoria</h2>
        <input
          type="text"
          placeholder="Nome da Categoria"
          value={nome}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <button className="button" type="submit">Salvar Alterações</button>
      </form>
    </div>
  );
}

export default EditCategories;
