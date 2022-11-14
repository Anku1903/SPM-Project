import React,{useState} from 'react'
import Nav from '../Home/Nav'
import './auth.css'
import {useNavigate} from 'react-router'
import axios from 'axios';

import {Navigate} from 'react-router-dom'
import { auth, serverurl, setCookie } from '../Helper/help';
function Login() {
    const isauth = auth()
const navigate = useNavigate();
    

const [formdata, setformdata] = useState({
    
    email: "",
    password: ""
})
    const makechange = text => e => {
        setformdata({...formdata,[text]: e.target.value})
    }

    const makesubmit = e =>{
        e.preventDefault();
        if(formdata.email==="" || formdata.password===""){
            alert("All fields are cumpulsory!!")
        }
        else{
            axios.post(serverurl+"/api/login",{email: formdata.email,password: formdata.password}).then(response => {
                if(response.data.result){
                    alert(response.data.result)
                   if(response.data.userdata){
                    setCookie(response.data.userdata)
                   }

                    
                    navigate('/')
                }
            }).catch(err => alert(err))
        }
    }
  return (
    <>
    {isauth && <Navigate to="/" />}
    <Nav />
    
    <div className='wraper'>
<div className='left'>
<section className='copy'>
    <h1>Welcome Back!!<br/> Login with FOODIES</h1>
</section>

</div>

<div className='right'>

    <form onSubmit={makesubmit}>
        <section className='copy'>
        <h2>Login</h2>
        <div className='login-container'>
            <p>Don;t have an account?  <a href='/signup'><strong>Register</strong> </a></p>
        </div>

        </section>

        

        <div className='input-container email'>
            <label for="email">Email</label>
            <input id="email" name="email" type='email' onChange={makechange('email')} />
        </div>

        <div className='input-container password'>
            <label for="password">Password</label>
            <input id="password" name="password" type='password' placeholder='Must be atleast 6 characters.' onChange={makechange('password')} />
        </div>


        

        <button className='signup-btn' type='submit'>Login</button>
    </form>
</div>


    </div>




    </>
  )
}

export default Login