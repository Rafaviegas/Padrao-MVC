import { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import axios from 'axios'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    const request = axios.post('http://localhost:3000/auth/login', {email: email, password: password})
    request.then((response)=> {
      toast.success("Acesso bem sucedido! 😁");
    }).catch((response)=> {
        toast.error(`Acesso negado: ${response.response.data.message} 😢` );
      console.log(response.response.data.message)
    })
    console.log(client)
  }

  return (
    <div id='login'>
      <form onSubmit={handleSubmit}>
        <h1>LOGIN</h1> 
        <input onChange={(e)=>setEmail(e.target.value)} className='mb35' type='text' placeholder='Email'/>
        <input onChange={(e)=>setPassword(e.target.value)} className='mb14' type='password' placeholder='Senha'/>
        <div className='create'>
          <p>Não possui uma conta?</p>
          <a href='#'>Criar</a>
        </div>
        <button className='button'>Entrar</button>
        <ToastContainer />
      </form>
    </div>
  )
}

export default App
