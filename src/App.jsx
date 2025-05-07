import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import axios from 'axios';
import './App.css'

function App() {
  const[email, setEmail] = useState('');
  const[senha, setSenha] = useState('');
  
  function onSubmit(e) {
    e.preventDefault()
    console.log(email)
  }

  return (
    <div id='login'>
      <form onSubmit={onSubmit}>
        <h1>LOGIN</h1> 
        <input className='mb35' type='email' value={email} placeholder='Email' onChange={(e) => setEmail(e.target.value)} required/>
        <input className='mb14' type='password' value={senha} placeholder='Senha' onChange={(e) => setSenha(e.target.value)} required/>
        <div className='create'>
          <p>Não possui uma conta?</p>
          <a href='#'>Criar</a>
        </div>
        <button type='submit' className='button'>Entrar</button>
      </form>
    </div>
  )
}

export default App
