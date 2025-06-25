import { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import './editLeitor.css';

function EditLeitor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const [form, setForm] = useState({ nome: '', email: '', Numero: '' });

  useEffect(() => {
    fetch(`http://localhost:3000/leitores/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => setForm(data));
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`http://localhost:3000/leitores/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(form)
      });

      if (res.ok) {
        alert('Leitor atualizado com sucesso!');
        navigate('/leitores');
      } else {
        alert('Erro ao atualizar leitor.');
      }
    } catch (err) {
      console.error(err);
      alert('Erro ao conectar com o servidor.');
    }
  };

  return (
    <div id="edit-leitor">
      <form onSubmit={handleSubmit}>
        <Link to='/home'>Voltar para a home</Link>
        <h2>Editar Leitor</h2>
        <input name="nome" value={form.nome} onChange={handleChange} required />
        <input name="email" type="email" value={form.email} onChange={handleChange} required />
        <input name="Numero" type="text" value={form.Numero} onChange={handleChange} required />
        <button className="button" type="submit">Salvar</button>
      </form>
    </div>
  );
}

export default EditLeitor;
