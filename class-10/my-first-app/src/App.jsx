import React, { useEffect, useState } from "react";

import Header from "./components/Header";
import Home from './components/Home';
import About from './components/About'
import Profile from'./components/profile' 
import Footer from './components/Footer'


function App() {

  const [page, setPage] = useState('home');
  
  const renderPage = () => {
    switch (page) {
      case 'home': return <Home />;
      case 'about': return <About />
      case'profile':return<Profile/>
      default: return <Home />
    }
  };

  return (
    <>
      <Header changePage={setPage} />
      <main>
         {renderPage()}
      </main>
      <Footer/>
      
      
    </>
  )
};
export default App;





