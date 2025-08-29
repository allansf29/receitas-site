import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import "./styles/global.css"
import Home from './pages/Home'
import Header from './components/Header'
import RecipeList from './pages/Recipes'
import About from './pages/About'
import Navbar from './components/Navbar';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/receitas" element={<RecipeList />} />
        <Route path="/sobre" element={<About />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
