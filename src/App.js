import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Chatbot from './components/Chatbot';
import Home from './pages/Home';
import Services from './pages/Services';
import ServiceDetail from './pages/ServiceDetail';
import About from './pages/About';
import Contact from './pages/Contact';
import useWhatsApp from './useWhatsApp';
import { FaWhatsapp } from 'react-icons/fa';
import './index.css';

function App() {
  const { open } = useWhatsApp();

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/services/:slug" element={<ServiceDetail />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      <Footer />
      <Chatbot />
      <button className="whatsapp-float" onClick={() => open('Hi Bikash! I want to order a service from CREOVATE')}>
        <FaWhatsapp />
      </button>
    </BrowserRouter>
  );
}

export default App;
