import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div id='login'>
      <form>
        <h1>LOGIN</h1> 
        <input className='mb35' type='text' placeholder='Email'/>
        <input className='mb14' type='password' placeholder='Senha'/>
        <div className='create'>
          <p>Não possui uma conta?</p>
          <a href='#'>Criar</a>
        </div>
        <button className='button'>Entrar</button>
      </form>
    </div>
  )
}

export default App
