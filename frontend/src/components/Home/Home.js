import React from 'react'
import './Home.css'
import Nav from './Nav'
import pizza3 from '../../images/pizza3.png'
function Home() {
  return (
    <>

<header>

    <Nav />
    <div className="h-text">
			<p>Free Home Delivery</p>
		<h1>Quality F<span>oo</span>ds </h1>
		<h2>Pizza of the Week</h2>
		<a href="/" id="order">Order now!!</a>
		<a href="/" id="dis">25% Off Hurry!!</a>
	</div>
	<div id="pizza">
		<img src={pizza3} alt="pizza" width="100" />	
		<img src={pizza3} alt="pizza" width="100" />
		<img src={pizza3} alt="pizza" width="100" />
	</div>
</header>





    </>
  )
}

export default Home