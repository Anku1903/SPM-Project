import React, { useState ,useEffect} from 'react'
import './Cart.css'
import empty from '../../images/cartimg.png'
import Nav from '../Home/Nav'
import { auth, serverurl } from '../Helper/help';
import axios from 'axios';
function Cart() {
   const [usercart,setusercart] = useState(
    JSON.parse(localStorage.getItem("mycart")) || {
        items: [],
        total: 0,
        totalqty: 0
    }
   );
    let visitcart = {};
    if(localStorage.getItem("mycart")){
        visitcart = JSON.parse(localStorage.getItem("mycart"));
        
      
        
    }
    else{
        visitcart = {
            items: [],
            total: 0,
            totalqty: 0
        }
    }

    
    const makesubmit = e => {
        
        e.preventDefault();
const fname = e.target.fname.value;

const address = e.target.address.value;
if(fname==="" || address==="") {
    alert("All fields are required!")
}
else{
    const isauth = auth()
    axios.post(serverurl+'/api/order',{username: isauth.name,
    email: isauth.email,
    total: visitcart.total,
   qty: visitcart.totalqty,
   items: visitcart.items,
   address: e.target.address.value
}).then(response => {
console.log(response.data.result)
})
if(localStorage.getItem("mycart")){
localStorage.removeItem("mycart")
window.location.reload()
}
}
 
    }



const remove = (id) => {
    let ritem = visitcart.items.find(item => item._id===id)
    let update = visitcart.items.filter(item => item._id!==id);
    
    setusercart(oldcart => {
        oldcart.items = update;
        oldcart.total = oldcart.total - Number(ritem.price)*ritem.qty;
        oldcart.totalqty-=ritem.qty;

        return oldcart
    })

    if(localStorage.getItem("mycart")){
        localStorage.removeItem("mycart");
        localStorage.setItem("mycart",JSON.stringify(usercart));
        window.location.reload();
    }
}

const plus = (id) => {
    let price;
   let update = visitcart.items.map(obj => {
        if(obj._id===id){
            price = Number(obj.price)
            ++obj.qty;
            return obj
        
        }
        return obj
    });

    setusercart(oldcart => {
        oldcart.items = update;
        oldcart.total+=price;
        oldcart.totalqty+=1;
        return oldcart
    })

//visitcart.items = update;
if(localStorage.getItem("mycart")){
    localStorage.removeItem("mycart");
    localStorage.setItem("mycart",JSON.stringify(usercart));
    window.location.reload();
}
}
const minus = (id) => {
    let price,boolqty=false;
   let update = visitcart.items.map(obj => {
        if(obj._id===id){
            price = Number(obj.price);
            if(obj.qty>1){
               --obj.qty;   
               return obj    
          }
          else{ 
            boolqty = true
            return obj
          }
            
        }
        return obj
    });
    
    if(!boolqty) {
        setusercart(oldcart => {
            oldcart.items = update;
            oldcart.total-=price;
            oldcart.totalqty-=1;
            return oldcart
        })
    }
    if(localStorage.getItem("mycart")){
        localStorage.removeItem("mycart");
        localStorage.setItem("mycart",JSON.stringify(usercart));
        window.location.reload();
    }
}


  return (
    <>
    <Nav />
    {visitcart.items.length<=0 && <div className="empty-cart">
<h3> Cart Empty !</h3>
<img src={empty} alt="empty cart" />
<a href='/' className="goback">Go Back</a>
</div>}


{visitcart.items.length>0 && <div className="wrapper">
		<h1>Cart</h1>
		<div className="project">
			<div className="shop">
				{
                    usercart.items.map(element => {
                        return(
                            <>
                            <div className="boxc">
					<img src={element.image} />
					<div className="content">
						<h3>{element.name}</h3>
						<h4>₹ {element.price}</h4>
						<p className="unit">Quantity: 
                        <button className='qty' onClick={() => {plus(element._id)}}> + </button>
                        <button className='qty'> {element.qty} </button>
                        <button className='qty' onClick={() => {minus(element._id)}}> - </button>
                        </p>
						<p className="btn-area" onClick={() => {remove(element._id)}}> <span className="btn2">Remove</span></p>
					</div>
				</div>
                            </>
                        )
                    })
                }
                
			</div>
			<div className="right-bar">
            <form onSubmit={makesubmit}>
            <label for="fname">Full name</label>
            <input id="fname" name="fname" type='text' />
            <label for="address">Address</label>
            <input id="address" name="address" type='text' />
			
				<p><span>Total</span> <span>₹ {usercart.total}</span></p><button type="submit" className='placebtn'>Place order</button>
			
            </form>
            
            </div>
		</div>
	</div>}
    
    </>
  )
}

export default Cart