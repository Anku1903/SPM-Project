import React,{useState,useEffect} from 'react'
import Nav from '../Home/Nav'
import './Explore.css'
import pizza3 from '../../images/pizza3.png'
import axios from 'axios'
import {Navigate} from 'react-router-dom'
import { auth, serverurl } from '../Helper/help'
function Explore() {
   const isauth = auth()
  const [restaurents, setrestaurents] = useState([])
  useEffect(() => {
    axios.get(serverurl+"/api/restaurents").then(response =>{
      if(response.data.error){
        alert(response.data.error)
      }
      else{
        console.log(response.data.restaurents)
        setrestaurents(response.data.restaurents)
      }
    })
  }, [])
  return (
    <>
    {(!isauth || isauth.isowner==="yes") && <Navigate to='/login' />}
    
    

      <Nav />
      <section className='home' id='home'>
        <div className='home-div'>
          <h1>Explore All Restaurents.</h1>
          <h2>CALORIES DON'T COUNT ON THE WEEKENDS!!</h2>
          <a href='/explore' className='home-btn'>25% OFF</a>
        </div>
        <div className='home-img'>
          <img src={pizza3} alt='burger' />
        </div>
      </section>


      <section className='popular' id='popular'>

      <h1 className='popular-heading'>ALL <span>Restaurents</span></h1>
<div className='box-container'>

{restaurents && restaurents.map(item => {
  const visit = "/visite/"+item._id
  return(
    <>
    <div className='box'>
  <img src={item.image} alt='burger' />
  <h3>{item.name}</h3>
  <a href={visit} className='box-btn'>Visit</a>
</div>
    </>
  )
})}


</div>
      </section>



    </>
  )
}

export default Explore




















