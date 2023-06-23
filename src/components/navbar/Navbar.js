import React, { useRef, useState } from 'react'
import './styles.scss'
import { Link } from 'react-router-dom'

function Navbar() {
    function myFunction() {
        const navRef=document.getElementById("myTopnav");
        if (navRef.className === "topnav") {
            navRef.className += " responsive";
        } else {
            navRef.className = "topnav";
        }
      }

  return (
    <div className="topnav" id="myTopnav" > 
        <Link to='/' onClick={myFunction}>Create Form</Link>
        <Link to='/allforms' onClick={myFunction}>Show All Froms</Link>
        <Link className='icon'><i className="fa fa-bars" onClick={myFunction}></i></Link>
  </div>
  )
}

export default Navbar