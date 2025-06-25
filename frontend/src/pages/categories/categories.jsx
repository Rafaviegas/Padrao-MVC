import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './categories.css';

function Categories() {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await fetch('http://localhost:3000/categorias', {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      const data = await res.json();
      setCategories(data);
    } catch (err) {
      console.error('Erro ao carregar categorias:', err);
    }
  };

  const handleDelete = async (id) => {
    const confirm = window.confirm('Deseja excluir esta categoria?');
    if (!confirm) return;

    try {
      await fetch(`http://localhost:3000/categorias/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCategories(categories.filter(cat => cat.id !== id));
    } catch (err) {
      console.error('Erro ao deletar categoria:', err);
    }
  };

  return (
    <div id="categories">
      <div className="header">
        <Link to='/home'>Voltar para a home</Link>
        <h1>Categorias</h1>
        <button className="button" onClick={() => navigate('/categories/addCategorie')}>
          Nova Categoria
        </button>
      </div>

      <div className="list">
        {categories.length === 0 ? (
          <p>Nenhuma categoria cadastrada.</p>
        ) : (
          categories.map(cat => (
            <div key={cat.id} className="item">
              <span>{cat.nome}</span>
              <div>
                <button onClick={() => navigate(`/categories/edit/${cat.id}`)} className="edit">Editar</button>
                <button onClick={() => handleDelete(cat.id)} className="delete">Excluir</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Categories;
