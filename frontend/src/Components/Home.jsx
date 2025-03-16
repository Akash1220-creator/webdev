import React from 'react'
import Hero from "../Home/Hero.jsx";
import Trending from "../Home/Trending.jsx";
import Devotional from "../Home/Devotional.jsx";
import Creators from "../Home/Creators.jsx";
import Footer from "../Components/Footer.jsx";

function Home() {
  return (
    <div>
      <Hero/> <Trending/> < Devotional/><  Creators/>
    </div>
  )
}

export default Home;