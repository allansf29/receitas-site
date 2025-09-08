import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import "./styles/global.css"
import Home from './pages/Home'
import RecipeList from './pages/Recipes'
import About from './pages/About'
import Navbar from './components/Navbar';
import Footer from '../src/components/Footer';
import Admin from '../src/pages/Admin/Login';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/receitas" element={<RecipeList />} />
        <Route path="/sobre" element={<About />} />
        <Route path="/admin" element={<Admin />} />
        {/* <Route path="/admin/login" element={<Login />} /> */}
      </Routes>
      <Footer />
    </BrowserRouter>
  </StrictMode>,
)
