import { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import './editLivros.css';

function EditLivros() {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const [form, setForm] = useState({
    nome: '',
    autor: '',
    editor: '',
    quantidade: '',
    categoriaId: ''
  });

  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const livroRes = await fetch(`http://localhost:3000/livros/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const livroData = await livroRes.json();
        setForm(livroData);

        const categoriasRes = await fetch('http://localhost:3000/categorias', {
          headers: { Authorization: `Bearer ${token}` }
        });
        const categoriasData = await categoriasRes.json();
        setCategorias(categoriasData);
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
      }
    };

    fetchData();
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`http://localhost:3000/livros/${id}`, {
        method: 'PUT',
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
        alert('Livro atualizado com sucesso!');
        navigate('/books');
      } else {
        alert('Erro ao atualizar livro.');
      }
    } catch (error) {
      console.error(error);
      alert('Erro ao conectar com o servidor.');
    }
  };

  return (
    <div id="edit-livro">
      <form onSubmit={handleUpdate}>
        <Link to='/home'>Voltar para a home</Link>
        <h2>Editar Livro</h2>
        <input name="nome" placeholder="Nome" value={form.nome} onChange={handleChange} required />
        <input name="autor" placeholder="Autor" value={form.autor} onChange={handleChange} required />
        <input name="editor" placeholder="Editora" value={form.editor} onChange={handleChange} required />
        <input name="quantidade" type="number" placeholder="Quantidade" value={form.quantidade} onChange={handleChange} required />
        <select name="categoriaId" value={form.categoriaId} onChange={handleChange} required>
          <option value="">Selecione uma categoria</option>
          {categorias.map(cat => (
            <option key={cat.id} value={cat.id}>{cat.nome}</option>
          ))}
        </select>
        <button className="button" type="submit">Salvar</button>
      </form>
    </div>
  );
}

export default EditLivros;
