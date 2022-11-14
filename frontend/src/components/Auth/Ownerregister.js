import axios from 'axios'
import React,{useState} from 'react'
import { serverurl } from '../Helper/help'
import Nav from '../Home/Nav'
import {useNavigate} from 'react-router'
import './auth.css'
function Register() {

const navigate = useNavigate();

const api = "https://api.cloudinary.com/v1_1/olximg1903/image/upload";
    
const [signuptext, setsignuptext] = useState("Sign up")

    const [formdata, setformdata] = useState({
        name: "",
        email: "",
        password: "",
        cpassword: "",
        isowner: true,
        image: ""
    })

    const makechange = text => e => {
        setformdata({...formdata,[text]: e.target.value})
        
    }
    const makecheck = (e) => {
        setformdata({...formdata,isowner: e.target.checked})
    }

    const makesubmit = e =>{
        e.preventDefault();
        console.log(formdata.isowner)
        if(formdata.name==="" || formdata.email==="" || formdata.password==="" || formdata.cpassword===""){
            alert("All fields are cumpulsory!!")
        }
        if(formdata.password!==formdata.cpassword){
            alert("Password does not match!!")
        }
        else{
            setsignuptext("Please Wait...")
            let check = ""
            if(formdata.isowner)
                check = "yes"
            else
                check="no"

                const file = e.target.file.files[0];
                const data = new FormData();
                data.append('file',file);
                data.append('upload_preset','myolximg');
                axios.post(api,data).then(res => {
                    console.log(res.data)
                    


                    
            axios.post(serverurl+"/api/register",{name: formdata.name,email: formdata.email,password: formdata.password,isowner: check,image: res.data.url}).then(response => {
                if(response.data.result._id){
                    alert("You're registered successfully")
                    navigate('/login')
                }
            }).catch(err => alert(err))
                   
                })
                
        }
    }
  return (
    <>
    <Nav />

    <div className='wraper'>
<div className='left'>
<section className='copy'>
    <h1>SIgnup with FOODIES</h1>
    <p>Explore multiple restaurents with delicious foods.</p>
</section>

</div>

<div className='right'>

    <form onSubmit={makesubmit}>
        <section className='copy'>
        <h2>Signup</h2>
        <div className='login-container'>
            <p>Already have an account?  <a href='/login'><strong>Login</strong> </a></p>
        </div>

        </section>

        <div className='input-container name'>
            <label for="fname">Restaurent name</label>
            <input id="fname" name="name" type='text' onChange={makechange("name")} />
        </div>

        <div className='input-container email'>
            <label for="email">Email</label>
            <input id="email" name="email" type='email' onChange={makechange("email")} />
        </div>

        <div className='input-container password'>
            <label for="password">Password</label>
            <input id="password" name="password" type='password' placeholder='Must be atleast 6 characters.' onChange={makechange("password")} />
        </div>

        <div className='input-container password'>
            <label for="cpassword">Confirm Password</label>
            <input id="cpassword" name="cpassword" type='password' onChange={makechange("cpassword")} />
        </div>

        <div className='input-container password'>
            <label for="cpassword">Upload Cover image</label>
            <input id="file" name="file" type='file' />
        </div>

        

        <button className='signup-btn' type='submit'>{signuptext}</button>
    </form>
</div>


    </div>
    




    </>
  )
}

export default Register