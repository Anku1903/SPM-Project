import React,{useState} from 'react'
import { useNavigate } from 'react-router'
import { auth, removeCookie } from '../Helper/help'
import './Nav.css'
function Nav() {
	const navigate = useNavigate()
	const isauth = auth()
	

	const Logout = () => {
		removeCookie();
		navigate("/login");
	  }
  return (
    <>
{!isauth && <nav>
		<div className="logo"><span>FO</span>ODIES</div>
		<div className="menu">
				<a href="/">Home</a>
			<a href="/explore">Explore</a>
			
            <a href="/login">Login</a>
			<a href="/signup">Signup</a>
		</div>
	</nav>}

	{isauth && isauth.isowner==="no" && <nav>
		<div className="logo"><span>FO</span>ODIES</div>
		<div className="menu">
				<a href="/">Home</a>
			<a href="/explore">Explore</a>
			<a href="/orders">Your Orders</a>
			
			<a href="/orders"><strong>{isauth.name}</strong></a>
			
            <a href='/login' onClick={Logout}>Logout</a>
			<a href='/cart'>Cart</a>
		</div>
	</nav>}

	{isauth && isauth.isowner==="yes" && <nav>
		<div className="logo"><span>FO</span>ODIES</div>
		<div className="menu">
				<a href="/">Home</a>
			<a href="/dashboard">Dashboard</a>
			
			
            <a href='/login' onClick={Logout}>Logout</a>
			<a>{isauth.name}</a>
		</div>
	</nav>}


    </>
  )
}

export default Nav