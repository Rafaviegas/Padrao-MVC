import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './livros.css';

function Livros() {
  const [livros, setLivros] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    fetch('http://localhost:3000/livros', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => setLivros(data));
  }, []);

  const handleDelete = async (id) => {
    const confirm = window.confirm("Deseja realmente excluir este livro?");
    if (!confirm) return;

    try {
      await fetch(`http://localhost:3000/livros/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      setLivros(livros.filter(livro => livro.id !== id));
    } catch (error) {
      console.error(error);
      alert('Erro ao excluir livro');
    }
  };

  return (
    <div id="livros">
      <div className="header">
        <Link to='/home'>Voltar para a home</Link>
        <h1>Livros</h1>
        <button className="button" onClick={() => navigate('/livros/addLivro')}>Cadastrar Novo</button>
      </div>

      <div className="livro-list">
        {livros.length === 0 ? (
          <p>Nenhum livro encontrado.</p>
        ) : (
          livros.map(livro => (
            <div key={livro.id} className="livro-item">
              <div>
                <strong>{livro.nome}</strong> - {livro.autor} - {livro.editor} - Quantidade: {livro.quantidade}
              </div>
              <div>
                <button onClick={() => navigate(`/livros/edit/${livro.id}`)} className="edit-button">Editar</button>
                <button onClick={() => handleDelete(livro.id)} className="delete-button">Excluir</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Livros;
