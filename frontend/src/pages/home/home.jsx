import {useNavigate} from 'react-router-dom'
import './home.css'

function Home(){
  const navigate = useNavigate()

  return (
    <div id='home'>
      <div id='operations'>
        <button onClick={()=> navigate('/users')}>Usuários</button>
        <button onClick={()=> navigate('/livros')}>Livros</button>
        <button onClick={()=> navigate('/categories')}>Categorias</button>
        <button onClick={()=> navigate('/loans')}>Empréstimos</button>
        <button onClick={()=> navigate('/employees')}>funcionários</button>
      </div>
    </div>
  )
}

export default Home;