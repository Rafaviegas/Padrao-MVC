import { useState } from 'react'
import { toast } from 'react-toastify'
import {jwtDecode} from 'jwt-decode'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'
import './login.css'

function Login() {
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const navigate = useNavigate()

  function handleSubmit(e) {
    e.preventDefault()
    const request = axios.post('http://localhost:3000/auth/login', {email: email, password: password})
    request.then((response)=> {
      const {access_token} = response.data
      const decode = jwtDecode(access_token)
      

      localStorage.setItem('token', access_token)
      localStorage.setItem('user', JSON.stringify({id: decode.sub, email: decode.email}))

      toast.success("Acesso bem sucedido! 😁");
      navigate('/home')
    }).catch((response)=> {
        toast.error(`Acesso negado: ${response.response.data.message} 😢` );
      console.log(response.response.data.message)
    })
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
      </form>
    </div>
  )
}

export default Login;
