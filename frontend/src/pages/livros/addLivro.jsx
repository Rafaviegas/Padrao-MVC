import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './addLivro.css';

function AddLivro() {
  const [form, setForm] = useState({
    nome: '',
    autor: '',
    editor: '',
    quantidade: '',
    categoriaId: ''
  });
  const [categorias, setCategorias] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    fetch('http://localhost:3000/categorias', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => setCategorias(data))
      .catch(err => console.error('Erro ao buscar categorias:', err));
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
    const res = await fetch('http://localhost:3000/livros', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        ...form,
        quantidade: parseInt(form.quantidade, 10)
      })
    });

      if (res.ok) {
        alert('Livro cadastrado com sucesso!');
        navigate('/livros');
      } else {
        alert('Erro ao cadastrar livro.');
      }
    } catch (error) {
      console.error(error);
      alert('Erro ao conectar com o servidor.');
    }
  };

  return (
    <div id="add-livro">
      <form onSubmit={handleSubmit}>
        <Link to='/home'>Voltar para a home</Link>
        <h2>Cadastrar Livro</h2>
        <input name="nome" placeholder="Nome" onChange={handleChange} required />
        <input name="autor" placeholder="Autor" onChange={handleChange} required />
        <input name="editor" placeholder="Editora" onChange={handleChange} required />
        <input name="quantidade" type="number" placeholder="Quantidade" onChange={handleChange} required />
        <select name="categoriaId" onChange={handleChange} required>
          <option value="">Selecione uma categoria</option>
          {categorias.map(cat => (
            <option key={cat.id} value={cat.id}>{cat.nome}</option>
          ))}
        </select>
        <button className="button" type="submit">Cadastrar</button>
      </form>
    </div>
  );
}

export default AddLivro;