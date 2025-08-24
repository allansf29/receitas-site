import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import "./styles/global.css"
import Home from './pages/Home'
import Header from './components/Header'
import RecipeList from './pages/Recipes'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/receitas" element={<RecipeList />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
