import axios from 'axios'
import React,{useState,useEffect} from 'react'
import { serverurl } from '../Helper/help'
import {useParams} from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast';
import Nav from '../Home/Nav'
import './Explore.css'
function Visite() {
  const {id} = useParams()
  

    const [restaurent, setrestaurent] = useState({})
    const [fooddata, setfooddata] = useState([])
    let visitcart = {
      items: [],
      total: 0,
      totalqty: 0
    }
    if(localStorage.getItem("mycart")){
      const getcart = JSON.parse(localStorage.getItem("mycart"))
      if(getcart.items.length > 0){
        visitcart.items = getcart.items
        visitcart.total = getcart.total
        visitcart.totalqty = getcart.totalqty
      }
    }

    const maketoast = (id) => {
    
      toast.success("Item added to cart!!")
      console.log("called")
      let exist = visitcart.items.find(item => item._id===id)
if(exist){
  exist.qty+=1;
 visitcart.totalqty+=1
 visitcart.total+=Number(exist.price)

}
else{
const newitem = fooddata.find(item => item._id===id)
newitem.qty = 1
visitcart.items.push(newitem)
visitcart.totalqty+=1
 visitcart.total+=Number(newitem.price)

}


  
localStorage.setItem("mycart",JSON.stringify(visitcart))

    }
  

    useEffect(() => {
     

      axios.get(serverurl+"/api/restaurents/"+id).then(response => {
        console.log(response.data.oneshop)
        if(response.data.oneshop){
          setrestaurent(response.data.oneshop)
          
        }
      })

    }, [])

    useEffect(() => {
      axios.post(serverurl+"/api/fooditems",{name: restaurent.name}).then(res => {
        if(res.data.fooddata){
          setfooddata(res.data.fooddata)
          
        }
      })
    }, [restaurent])
  return (
    <>
    <Nav />

    <section className='home' id='home'>
        <div className='home-div'>
          <h1> {restaurent.name}</h1>
        </div>
        <div className='home-img'>
          <img src={restaurent.logo} alt='burger' />
        </div>
      </section>


      <section className='popular' id='popular'>

      <h1 className='popular-heading'>ALL <span>Dishes</span></h1>
<div className='box-container'>

{fooddata && fooddata.map((item,idx) => {
  return(
    <>
    <div className='box'>
  <img src={item.image} alt='burger' />
  <h3>{item.name}</h3>
  <button onClick={() => {maketoast(item._id)}} className='box-btn'>₹ {item.price} ADD</button>
  <Toaster />
</div>
    </>
  )
})}


</div>
      </section>


    </>
  )
}

export default Visite