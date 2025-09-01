import React from 'react'
import img from '../img/ITpark.png'
import img1 from '../img/telegramm.png'
import img2 from '../img/instagramm.png'
import img3 from '../img/phoone.png'
import img4 from '../img/person.png'
import { NavLink } from 'react-router-dom'
function AboutPage() {
  return (
    <section className='about'>
      <div className="container">
        <div className="about__wrapper">
        <img src={img} alt="" />
        <div className="about_content">
        <a href="https://t.me/Muhlisa_95"><button><img src={img1} alt="" />@Muhlisa_95</button></a>
        <a href="https://www.instagram.com/_muhlisa.95/"><button><img src={img2} alt="" />@_muhlisa.95</button></a>
           <button><img src={img3} alt="" /><a href="tel:+998500029590">+998500029590</a></button>
         <NavLink to="/register">   <button><img src={img4} alt="" />Register</button></NavLink>
           
        </div>
        </div>
      </div>
    </section>
  )
}

export default AboutPage
