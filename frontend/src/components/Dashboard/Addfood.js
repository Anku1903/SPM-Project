import axios from 'axios'
import React,{useState} from 'react'
import { auth, serverurl } from '../Helper/help'
import Nav from '../Home/Nav'
import {useNavigate} from 'react-router'
import '../Auth/auth.css'
function Register() {

const navigate = useNavigate();

const api = "https://api.cloudinary.com/v1_1/olximg1903/image/upload";
    const isauth = auth()
const [signuptext, setsignuptext] = useState("ADD ITEM")

    const [formdata, setformdata] = useState({
        name: "",
        price: "",
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
        if(formdata.name==="" || formdata.price===""){
            alert("All fields are cumpulsory!!")
        }
        else{
            setsignuptext("Please Wait...")

                const file = e.target.file.files[0];
                const data = new FormData();
                data.append('file',file);
                data.append('upload_preset','myolximg');
                axios.post(api,data).then(res => {
                      
            axios.post(serverurl+"/api/additems",{name: formdata.name,price: formdata.price,shopname: isauth.name,image: res.data.url}).then(response => {
                if(response.data.result._id){
                    alert("item added successfully")
                window.location.reload();
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
    <h1>ADD NEW ITEM</h1>
</section>

</div>

<div className='right'>

    <form onSubmit={makesubmit}>
        

        <div className='input-container name'>
            <label for="fname">Food name</label>
            <input id="fname" name="name" type='text' onChange={makechange("name")} />
        </div>

        
        <div className='input-container name'>
            <label for="fname">Price</label>
            <input id="price" name="price" type='text' onChange={makechange("price")} />
        </div>


        <div className='input-container password'>
            <label for="file">Upload Food image</label>
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