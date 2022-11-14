import axios from 'axios';
import React, { useState,useEffect } from 'react'
import { serverurl } from '../Helper/help';
import Nav from '../Home/Nav'
import {auth} from '../../components/Helper/help'
import './Order.css'
function Order() {
    const isauth = auth()
    
const [data,setdata] = useState([])

useEffect(() => {
    axios.post(serverurl+'/api/findorder',{email: isauth.email}).then(response =>{
        setdata(response.data.orderdata)
              }).catch(err => console.log(err))
  }, [])
const deletefun = (id) => {
    setdata(old => {
        return old.filter(item => item._id!==id)
    })
    axios.post(serverurl+'/api/delitems',{id}).then(response =>{
       if(response.data.error){
        alert(response.data.error)
       }
       })
}
      
  return (
    <>
    <Nav />
    <table className='table-container'>
<thead><tr>
    
<th>Order ID</th>
    
    <th>Address</th>
    
    <th>Total</th>
    <th>Total items</th>
    <th>Status</th>
    
</tr>
</thead>

<tbody>
    {
        data.map(item => {
            return(
                <>
                <tr>
        <td>{item._id}</td>
        <td>{item.address}</td>
        <td>{item.total}</td>
        <td>{item.qty}</td>
        <td><button className='tbl-btn' onClick={() => {deletefun(item._id)}}>Delivered</button> </td>
                </tr>
                </>
            )
        })
    }
</tbody>
    </table>
    



    </>
  )
}

export default Order