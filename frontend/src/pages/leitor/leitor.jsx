import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './leitor.css';

function Leitor() {
  const [leitores, setLeitores] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    fetch('http://localhost:3000/leitores', {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
      .then(res => res.json())
      .then(data => setLeitores(data));
  }, []);

  const handleDelete = async (id) => {
    const confirm = window.confirm('Deseja excluir este leitor?');
    if (!confirm) return;

    try {
      await fetch(`http://localhost:3000/leitores/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });

      setLeitores(leitores.filter(l => l.id !== id));
    } catch (err) {
      console.error('Erro ao deletar leitor:', err);
    }
  };

  return (
    <div id="leitor-list">
      <div className="header">
        <Link to='/home'>Voltar para a home</Link>
        <h1>Leitores</h1>
        <button className="button" onClick={() => navigate('/leitores/addLeitor')}>Novo Leitor</button>
      </div>

      <div className="list">
        {leitores.length === 0 ? (
          <p>Nenhum leitor cadastrado.</p>
        ) : (
          leitores.map(l => (
            <div key={l.id} className="item">
              <span>{l.nome} - {l.email} - {l.Numero}</span>
              <div>
                <button onClick={() => navigate(`/leitores/edit/${l.id}`)} className="edit">Editar</button>
                <button onClick={() => handleDelete(l.id)} className="delete">Excluir</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Leitor;
