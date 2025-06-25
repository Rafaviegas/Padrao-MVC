import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './addLeitor.css';

function AddLeitor() {
  const [form, setForm] = useState({
    nome: '',
    email: '',
    Numero: ''
  });

  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('http://localhost:3000/leitores', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(form)
      });

      if (res.ok) {
        alert('Leitor cadastrado com sucesso!');
        navigate('/leitores');
      } else {
        alert('Erro ao cadastrar leitor.');
      }
    } catch (error) {
      console.error('Erro ao conectar com o servidor:', error);
      alert('Erro ao conectar com o servidor.');
    }
  };

  return (
    <div id="add-leitor">
      <form onSubmit={handleSubmit}>
        <Link to='/home'>Voltar para a home</Link>
        <h2>Cadastrar Leitor</h2>
        <input
          name="nome"
          placeholder="Nome"
          value={form.nome}
          onChange={handleChange}
          required
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          name="Numero"
          type="text"
          placeholder="Número (telefone)"
          value={form.Numero}
          onChange={handleChange}
          required
        />
        <button className="button" type="submit">Cadastrar</button>
      </form>
    </div>
  );
}

export default AddLeitor;
