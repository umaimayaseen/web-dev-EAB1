import React, { useState } from "react";

import Header from "./components/Header";
import Home from './components/Home';
import About from './components/About'

function App() {

  const [page, setPage] = useState('home');

  const renderPage = () => {
    switch (page) {
      case 'home': return <Home />;
      case 'about': return <About />
      default: return <Home />
    }
  };

  return (
    <>
      <Header setPage={setPage} />
    </>
  )
};
export default App;





