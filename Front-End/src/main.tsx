import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import "./styles/global.css"
import Home from './pages/Home'
import Header from './components/Header'
import RecipeList from './pages/Recipes'
import Navbar from './components/Navbar';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/receitas" element={<RecipeList />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
