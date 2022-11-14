import React,{useState,useEffect} from 'react'
import Nav from '../Home/Nav'
import '../Explore/Explore.css'
import burger from '../../images/starbucks.jpg'
import pizza3 from '../../images/pizza3.png'
import axios from 'axios'
import { auth, serverurl } from '../Helper/help'
function Explore() {
  // const isauth = auth()
  const [restaurents, setrestaurents] = useState([])
  const isauth = auth() 



  useEffect(() => {
    axios.post(serverurl+"/api/fooditems",{name:isauth.name}).then(response =>{
      if(response.data.error){
        alert(response.data.error)
      }
      else{
        setrestaurents(response.data.fooddata)
      }
    })
  }, [])
  return (
    <>
    

      <Nav />
      <section className='home' id='home'>
        <div className='home-div'>
          <h1>{isauth.name}</h1>
        
          
          <a href='/addfooditem' className='home-btn'>ADD FOOD ITEMS</a>
        </div>
        <div className='home-img'>
          <img src={isauth.image} alt='burger' />
        </div>
      </section>


      <section className='popular' id='popular'>

      <h1 className='popular-heading'>ALL <span>Food Items</span></h1>
<div className='box-container'>

{restaurents && restaurents.map(item => {
  
  return(
    <>
    <div className='box'>
  <img src={item.image} alt='burger' />
  <h3>{item.name}</h3>
  <button className='box-btn'>{item.price}</button>
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




















